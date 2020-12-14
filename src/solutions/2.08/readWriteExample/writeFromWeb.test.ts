import { Google } from "../inheritanceExample/pageObjects/GooglePage";
const fs = require("fs");
const google = new Google();

jest.setTimeout(10000);
test("does a search", async () => {
  await google.navigate();
  await google.search("puppies");
  let text = await google.getResults();
  expect(text).toContain("puppies");
  fs.writeFile(`${__dirname}/test.txt`, text, (e) => {
    if (e) console.error(e);
    else console.log("save successful");
  });
});
afterAll(async () => {
  await google.driver.quit();
});
