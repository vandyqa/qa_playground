console.log("\nOur object\n====================");

var myPerson = {
  firstName: "AJ",
  lastName: "Larson",
  age: 33,
};

console.log(
  `Person:\n\t Name: "${myPerson.firstName} ${myPerson.lastName}" \n\t Age: ${myPerson.age}`
);
// this is probably easier to read than:
// `Person:\n\t Name: "${x[0]} ${x[1]}" \n\t Age: ${x[2]}`
// while it works, using the object makes it more readable and maintainable

console.log("\nOur array\n====================");

var icecreamFlavors: Array<string> = [
  "Mint Cookie",
  "Mint Chip",
  "Cake Batter",
  "Cookies and Cream",
  "Cherry Garcia",
];

icecreamFlavors.forEach((thing, i) => {
  // a forEach can give back just each item in the array,
  // each item and the index,
  // or each item, the index, and the whole list
  console.log(`${i + 1}. ${thing}`);
});

console.log("\nAn array of objects\n====================");

//array of objects

var people = [
  {
    firstName: "AJ",
    lastName: "Larson",
    age: 33,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    age: 40,
  },
  {
    firstName: "John",
    lastName: "Doe",
    age: 14,
  },
];

people.forEach((person) => {
  // our item each time is each of the objects in our array
  console.log(
    `Person:\n\t Name: "${person.firstName} ${person.lastName}" \n\t Age: ${person.age}`
  );
});

// an object with an array!

console.log("\nAn object with an array\n====================");
var myPersonWithAnArray = {
  firstName: "AJ",
  lastName: "Larson",
  age: 33,
  favoriteIceCreams: [
    "Mint Cookie",
    "Mint Chip",
    "Cake Batter",
    "Cookies and Cream",
    "Cherry Garcia",
  ],
};
console.log(`Person:`);
console.log(
  `\t Name: "${myPersonWithAnArray.firstName} ${myPersonWithAnArray.lastName}"`
);
console.log(`\t Age: ${myPersonWithAnArray.age}`);
console.log(`\t Favorite Ice Cream Flavors:`);
// to access the array, we just need the property value, so we get it
// using the key, and then treat the value as an array (which it is)
myPersonWithAnArray.favoriteIceCreams.forEach((flavor) => {
  console.log(`\t\t${flavor}`);
});
