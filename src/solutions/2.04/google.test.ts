import { Builder, Capabilities } from "selenium-webdriver";

const chromedriver = require("chromedriver");
//this makes sure the test can find the chromedriver we just installed.

//we need to build the driver to control chrome
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();
// driver will control the browser now, using selenium-webdriver, and chromedriver

test("can load google", async () => {
  // we load pages with `driver.get()`
  await driver.get("https://www.google.com");
  // driver.quit() shuts down the driver, freeing up memory
  await driver.quit();
});
