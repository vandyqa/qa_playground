// Frequently, you only have one line after an if or an else; you actually don't
// need the {}s for that. See how the first if doesn't have them, but the
// second does.
if (true) console.log("Check 1");

if (false) {
  console.log("This should not print");
}

// an else will ALWAYS run when the if statement evaluates false
if (false) {
  console.log("This should not print");
} else {
  console.log("Check 2");
}

// else ifs depend on the result.
// you CAN trail a chain of these with another "else", but you don't need to.
if (false) {
  console.log("This should not print");
} else if (false) {
  console.log("This should not print");
} else if (true) {
  console.log("Check 3");
}

// here's a switch example - you need to pass a variable in, then try and find
// a matching case! If none are found, the default runs.
let thing = "ping";
switch (thing) {
  case "pong":
    console.log("This should not print");
    break;
  case "pong2":
    console.log("This should not print");
    break;
  case "pong3":
    console.log("This should not print");
    break;
  case "ping":
    console.log("Check 4");
    break;
  default:
    console.log("This should not print");
}

// stretch goal - you can stack as many statements as you want!
if (2 > 3) {
  console.log("This should not print");
} else {
  console.log("Check 5");
}

if ("hello" == "hello" && 5 > 2 && true) {
  console.log("Check 6");
}

if ((true && false && false && false) || 2 / 5 > 12) {
  console.log("This should not print");
}

// and another switch, with a break pulled out, and no default. You can change
// 'val' to see what prints!
let val = "something";
switch (val) {
  case "something":
    console.log("Check 7");
  case "another":
    console.log("Check 8");
    break;
  case "last":
    console.log("This should not print");
}
