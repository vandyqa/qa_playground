const fs = require("fs");

const myObj = {
  name: "AJ",
  favoriteColor: "Blue",
};
fs.writeFile(
  `${__dirname}/person${myObj.name}.json`,
  JSON.stringify(myObj, null, "    "),
  (e) => {
    if (e) console.error(e);
    else console.log("file saved successfully");
  }
);
