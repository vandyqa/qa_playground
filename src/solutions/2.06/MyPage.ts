import { Builder, By, Capabilities, WebDriver } from "selenium-webdriver";

const chromedriver = require("chromedriver");
// this boilerplate is sufficient to add to the start of the file

// it's just a standard class
class MyPage {
  // you should have a webdriver in each of your page objects
  driver: WebDriver;
  // a url can be helpful; you don't need it all the time though
  url: string;
  // constructor is a key word, so we just have a method named that,
  // taking arguments to populate our default properties
  // they're both optional though, we'll need to handle that.
  constructor(url?: string, driver?: string) {
    //to access a property in your class, use the `this`
    //keyword.
    if (url)
      //we'll only assign the url if it's passed in
      this.url = url;
    //the this keyword lets the object access its own properties
    //so we assign the url passed in to the 'url' property on the object
    if (driver) this.driver = driver;
    else this.getDriver(); // now if we have a driver passed in, we'll use it.
    // otherwise, we'll make ourselves a new one.
  }

  getDriver() {
    if (this.driver)
      // if the page already has a driver, return it
      return this.driver;
    // if it doesn't, make a new one!
    else return new Builder().withCapabilities(Capabilities.chrome()).build();
  }

  //this method will navigate to the url set when the page object was made
  async navigate() {
    await this.driver.get(this.url);
  }
}
