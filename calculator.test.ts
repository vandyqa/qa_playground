import { Builder, By, Capabilities, WebDriver } from "selenium-webdriver"; // importing the Selenium dependencies 

const chromedriver = require("chromedriver"); // Initializing the browser

const driver: WebDriver = new Builder()   //creating an object
  .withCapabilities(Capabilities.chrome())
  .build();

describe("The calculator", () => {  // writing a function
  beforeEach(async () => {    //beforeEach() is run before each test in a describe
    driver.get("http://localhost:3000"); // open the url
  });
  afterAll(async () => {
    driver.quit();  //close the browser at the end
  });
  describe("does simple math", () => {
    it("can do 2+2", async () => {
      await clickButton(driver, "2");
      await clickButton(driver, "+");
      await clickButton(driver, "2");
      await clickButton(driver, "=");
      let result = await getDisplay(driver);
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
      await clickButton(driver, "x");
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
    
    it("can do 2 ÷ -2", async () => {
      await clickButton(driver, "2");
      await clickButton(driver, "÷");
      await clickButton(driver, "2");
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
      await clickButton(driver, "x");
      await clickButton(driver, "1");
      await clickButton(driver, "5");
      await clickButton(driver, "x");
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
      await clickButton(driver, "x");
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