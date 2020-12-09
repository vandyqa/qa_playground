import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";
const chromedriver = require("chromedriver");

// this is standard "boilerplate" code.
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

class BggPage {
  driver: WebDriver;
  url: string = "https://boardgamegeek.com/";
  headerLogo: By = By.className("menu-logo-symbol"); // this element has a unique class
  searchBar: By = By.name("searchTerm"); // this element has a unique name
  gamePageName: By = By.xpath("//h1/a"); // many selectors pulled multiple elements, but the game name was the only a tag in an h1
  gamePageRating: By = By.css('[ng-show="showRating"]'); // you can use all sorts of different attributes for locators
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
  async navigate() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.headerLogo));
    await this.driver.wait(
      until.elementIsVisible(await this.driver.findElement(this.headerLogo))
    );
  }
  async getResultNameLink(name: string) {
    let xpathToFind = `//div[@id='maincontent']//a[text()='${name}']`;
    await this.driver.wait(until.elementLocated(By.xpath(xpathToFind)));
    return By.xpath(xpathToFind);
  }
  /** takes a By, waits for the element it identifies to be located,
   *  then returns the Promise<string>
   * @param {By} elementBy - the locator for the element we want text from
   * @returns Promise<String> - resolves to the element's text
   * @example
   * expect(await page.getText(By.name("foo"))).toBe("bar")
   */
  async getText(elementBy: By) {
    // we make sure the element is available to us
    await this.driver.wait(until.elementLocated(elementBy));
    // and return the Promise<string> from the getText()
    return this.driver.findElement(elementBy).getText();
  }
  async getAttribute(elementBy: By, attribute: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).getAttribute(attribute);
  }
  async click(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).click();
  }
  async sendKeys(elementBy: By, keys) {
    await this.driver.wait(until.elementLocated(elementBy));
    return this.driver.findElement(elementBy).sendKeys(keys);
  }
}

const bgg = new BggPage(driver);

describe("BoardGameGeek.com", () => {
  jest.setTimeout(15000);
  beforeEach(async () => {
    await bgg.navigate();
  });
  afterAll(async () => {
    await driver.quit();
  });
  test("the page loads", async () => {
    expect(await bgg.getAttribute(bgg.headerLogo, "alt")).toBe(
      "boardgame geek logo"
    );
  });
  test("I can search for a game and open the page", async () => {
    await bgg.sendKeys(bgg.searchBar, "Gloomhaven\n");
    await bgg.click(await bgg.getResultNameLink("Gloomhaven"));
    // easier to read too, right?
    expect(await bgg.getText(bgg.gamePageName)).toBe("Gloomhaven");
  });
  test("terraforming mars has a better rating than apples to apples", async () => {
    await driver.get(
      "https://boardgamegeek.com/boardgame/167791/terraforming-mars"
    );
    let tmRating = parseFloat(await bgg.getText(bgg.gamePageRating));
    await driver.get("https://boardgamegeek.com/boardgame/74/apples-apples");
    let ataRating = parseFloat(await bgg.getText(bgg.gamePageRating));
    expect(tmRating).toBeGreaterThan(ataRating);
  });
});
