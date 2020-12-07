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
      until.elementIsVisible(await driver.findElement(this.headerLogo))
    );
  }
  async getResultNameLink(name: string) {
    let xpathToFind = `//div[@id='maincontent']//a[text()='${name}']`;
    await this.driver.wait(until.elementLocated(By.xpath(xpathToFind)));
    return await this.driver.findElement(By.xpath(xpathToFind));
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
    // we need to wait for the page to load; we'll make sure the header logo is present
    await driver.wait(until.elementLocated(bgg.headerLogo));
    // now we'll make sure the header logo has the right alt text to validate that
    // the right page loaded.
    expect(await driver.findElement(bgg.headerLogo).getAttribute("alt")).toBe(
      "boardgame geek logo"
    );
  });
  test("I can search for a game and open the page", async () => {
    // again, we wait for the page to load
    await driver.wait(until.elementLocated(bgg.searchBar));
    // search with the new line character to hit enter
    await driver.findElement(bgg.searchBar).sendKeys("Gloomhaven\n");
    // use our page object method to ge the results page link for Gloomhaven
    await (await bgg.getResultNameLink("Gloomhaven")).click();
    await driver.wait(until.elementLocated(bgg.gamePageName));
    // we're just verifying the game we opened is Gloomhaven
    expect(await (await driver.findElement(bgg.gamePageName)).getText()).toBe(
      "Gloomhaven"
    );
  });
  test("terraforming mars has a better rating than apples to apples", async () => {
    // we've already tested searching for a game; we'll test faster with direct navigation
    await driver.get(
      "https://boardgamegeek.com/boardgame/167791/terraforming-mars"
    );
    await driver.wait(until.elementLocated(bgg.gamePageName));
    // once the page has loaded, we'll grab our game's rating
    let tmRating = parseFloat(
      // parseFloat will get a floating point (decimal) number out of text
      await (await driver.findElement(bgg.gamePageRating)).getText()
    );
    await driver.get("https://boardgamegeek.com/boardgame/74/apples-apples");
    await driver.wait(until.elementLocated(bgg.gamePageName));
    // same here;
    let ataRating = parseFloat(
      await (await driver.findElement(bgg.gamePageRating)).getText()
    );
    // and we're asserting the one rating value to be higher than the other
    expect(tmRating).toBeGreaterThan(ataRating);
  });
});
