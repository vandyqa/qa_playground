import { Builder, By, Capabilities, until } from "selenium-webdriver";
const chromedriver = require("chromedriver");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const fs = require("fs");
jest.setTimeout(15000);
test("a screenshot of google", async () => {
  await driver.get("https://www.google.com");
  await driver.wait(until.elementLocated(By.name("q")));
  //this is almost EXACTLY the same as other file saves - just one extra arg
  await fs.writeFile(
    //filepath
    `${__dirname}/google.png`,
    //get the data to save (our screenshot)
    await driver.takeScreenshot(),
    //add an encoding argument
    "base64",
    //then the callback
    (e) => {
      if (e) console.error(e);
      else console.log("Image saved successfully");
    }
  );
});
afterAll(async () => {
  await driver.quit();
});
