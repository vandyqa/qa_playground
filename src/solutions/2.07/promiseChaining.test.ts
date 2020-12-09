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

//note, this is NOT an async function, at least not explicitly
test("promise chaining", () => {
  return (
    driver
      .get("https://www.google.com")
      .then(() => {
        return driver.wait(until.elementLocated(By.name("q")));
      })
      .then(() => {
        // each callback returns another promise
        // which we can call `.then()` on!
        return driver.findElement(By.name("q")).sendKeys("Puppies\n");
      })
      .then(() => {
        // we wait for the results....
        return driver.wait(until.elementLocated(By.id("rso")));
      })
      .then(() => {
        //this promise resolves into the text value of the results container
        return driver.findElement(By.id("rso")).getText();
      })
      // and we can pass the return value of the previous promise into the `then()`
      // callback!
      .then((value) => {
        // this is the technical way to handle a promise's return value.
        // we use it in this callback, or we can throw it into a variable
        // declared outside of the chain.
        expect(value.toLowerCase()).toContain("puppies");

        // now our test is returning a promise that resolves to return another promise
        // jest will wait for the whole chain to resolve!
        return driver.quit();
      })
      .catch((e) => {
        // a catch callback is passed an error message, so we'll print it
        console.log(e);
        // we also wouldn't want our test to pass because it skipped the assertion!
        expect(false).toBeTruthy();
        // and lastly, we want to close the browser still. (another reason for
        // `after()` or `afterAll()`)
        return driver.quit();
      })
  );
});
