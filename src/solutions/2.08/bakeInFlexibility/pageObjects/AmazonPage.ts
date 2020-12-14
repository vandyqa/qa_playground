import {
  WebDriver,
  By,
  until,
  Builder,
  Capabilities,
} from "selenium-webdriver";
const chromedriver = require("chromedriver");

export class AmazonPage {
  driver: WebDriver;
  searchbar: By = By.id("twotabsearchtextbox");
  results: By = By.xpath("//div[contains(@class, 's-main-slot')]//h2//span");
  url: string = "https://amazon.com";
  constructor(driver?: WebDriver) {
    if (driver) this.driver = driver;
    else
      this.driver = new Builder()
        .withCapabilities(Capabilities.chrome())
        .build();
  }
  async navigate() {
    this.driver.get(this.url);
  }
  async search(query: string) {
    await this.driver.wait(until.elementLocated(this.searchbar));
    let searchBar = await this.driver.findElement(this.searchbar);
    await this.driver.wait(until.elementIsVisible(searchBar));
    await searchBar.clear();
    await searchBar.sendKeys(`${query}\n`);
    await this.driver.wait(until.elementsLocated(this.results));
  }
  async getResults() {
    await this.driver.wait(until.elementsLocated(this.results));
    return await this.driver.findElements(this.results);
  }
  async getResultsAsText() {
    let elements = await this.getResults();
    let resultList: Array<string> = [];
    for (let i = 0; i < elements.length; i++) {
      resultList.push(await (await elements[i].getText()).trim());
    }
    return resultList;
  }
  async clickMatchingResult(containedString: string) {
    let elements = await this.getResults();
    let matchingResult = await elements.find(
      async (el) => await (await el.getText()).includes(containedString)
    );
    if (matchingResult) await matchingResult.click();
    else console.log("there was no result for " + containedString);
  }
}
