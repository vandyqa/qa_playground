export {};
// You can import something like we discussed. Otherwise, you can import with fs!
const fs = require("fs");

fs.readFile(`${__dirname}/personAJ.json`, (e, data) => {
  if (e) console.error(e);
  console.log(JSON.parse(data));
});
