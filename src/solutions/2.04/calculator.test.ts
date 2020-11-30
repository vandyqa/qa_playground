import { Builder, By, Capabilities, WebDriver } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

describe("The calculator", () => {
  beforeEach(async () => {
    driver.get("http://localhost:3000");
  });
  afterAll(async () => {
    driver.quit();
  });
  describe("does simple math", () => {
    it("can do 2+2", async () => {
      await clickButton(driver, "2");
      await clickButton(driver, "+");
      await clickButton(driver, "2");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
      // we can use the exact same "expect" assertions as before.
      expect(result).toBe("4");
    });
    it("can do 5-7", async () => {
      await clickButton(driver, "5");
      await clickButton(driver, "-");
      await clickButton(driver, "7");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
      expect(result).toBe("-2");
    });
    it("can do 18×2", async () => {
      await clickButton(driver, "1");
      await clickButton(driver, "8");
      await clickButton(driver, "×");
      await clickButton(driver, "2");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
      expect(result).toBe("36");
    });
    it("can do 75÷10", async () => {
      await clickButton(driver, "7");
      await clickButton(driver, "5");
      await clickButton(driver, "÷");
      await clickButton(driver, "1");
      await clickButton(driver, "0");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
      expect(result).toBe("7.5");
    });
  });
  describe("does more complicated math", () => {
    // the tests here are formatted the same way;
    // 1. every button push we might need
    // 2. grab the display, and add an expect to check the results
    it("can do 2 ÷ -2", async () => {
      await clickButton(driver, "2");
      await clickButton(driver, "÷");
      await clickButton(driver, "2");
      // the negative might be tricky to figure out at first, especially if you
      // didn't know what the "+/-" button did. I figure out most of my test
      // steps in automation by following along manually as I go.
      await clickButton(driver, "+/-");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
      expect(result).toBe("-1");
    });
    it("can do 3.14159 × 15 × 15", async () => {
      await clickButton(driver, "3");
      await clickButton(driver, ".");
      await clickButton(driver, "1");
      await clickButton(driver, "4");
      await clickButton(driver, "1");
      await clickButton(driver, "5");
      await clickButton(driver, "9");
      await clickButton(driver, "×");
      await clickButton(driver, "1");
      await clickButton(driver, "5");
      await clickButton(driver, "×");
      await clickButton(driver, "1");
      await clickButton(driver, "5");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
      expect(result).toBe("706.85775");
    });
    it("can do (-22 - 5 + 12) × 200", async () => {
      await clickButton(driver, "2");
      await clickButton(driver, "2");
      await clickButton(driver, "+/-");
      await clickButton(driver, "-");
      await clickButton(driver, "5");
      await clickButton(driver, "+");
      await clickButton(driver, "1");
      await clickButton(driver, "2");
      await clickButton(driver, "×");
      await clickButton(driver, "2");
      await clickButton(driver, "0");
      await clickButton(driver, "0");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
      expect(result).toBe("-3000");
    });
  });
});

/** Pass in the driver, and a string matching the button you want to click, and the button will be clicked
 * @param {WebDriver} driver the test's driver object
 * @param {string} button the text on the button to click
 * @example clickButton(driver, "=") // will click the equals button
 */
async function clickButton(driver: WebDriver, button: string): Promise<void> {
  return (
    await driver.findElement(By.xpath(`//button[text()="${button}"]`))
  ).click();
}
/** Pass in the driver, and get back a promise that will resolve as the displayed value
 * @param {WebDriver} driver the test's driver object
 * @returns {Promise<string>} A promised string that resolves to the text of the display
 * @example
 * getDisplay(driver).then(result=>console.log) // will log the text
 * let result = await getDisplay(driver) // will assign the text to the variable result
 */
async function getDisplay(driver: WebDriver): Promise<string> {
  return await (await driver.findElement(By.css(".display"))).getText();
}
