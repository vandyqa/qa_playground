import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

//note, this IS an async function, explicitly
test("async await functionality", async () => {
  await driver.get("https://www.google.com");
  await driver.wait(until.elementLocated(By.name("q")));
  await driver.findElement(By.name("q")).sendKeys("Puppies\n");
  await driver.wait(until.elementLocated(By.id("rso")));
  let value = await driver.findElement(By.id("rso")).getText();
  // our assertion doesn't need an await - it isn't asynchronous
  // (or rather, it's synchronous)
  expect(value.toLowerCase()).toContain("puppies");
});

// provides cleaner error handling to have the quit after the test
// because an error won't stop the environment from being shut down.
afterAll(async () => {
  await driver.quit();
});
