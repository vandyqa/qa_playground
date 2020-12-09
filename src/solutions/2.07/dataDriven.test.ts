import * as animals from "./animals.json";
import {
  WebDriver,
  Builder,
  Capabilities,
  until,
  By,
} from "selenium-webdriver";
const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

animals.forEach((animal) => {
  test(`searching google for ${animal}`, async () => {
    await driver.get("https://www.google.com");
    await driver.wait(until.elementLocated(By.name("q")));
    await driver.findElement(By.name("q")).sendKeys(`${animal}\n`);
    await driver.wait(until.elementLocated(By.id("rso")));
    let value = await driver.findElement(By.id("rso")).getText();
    expect(value.toLowerCase()).toContain(animal);
  });
});

afterAll(async () => {
  await driver.quit();
});
