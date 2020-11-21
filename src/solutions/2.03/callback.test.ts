/** gets a number between 1 and 10 for the callback
 * @callback numberHandler is passed the number generated
 */
function getNumber(numberHandler) {
  numberHandler(Math.ceil(Math.random() * 10));
}

// we know that `getNumber` passed a number into the callback, so that's the
// parameter we give numberChecker
function numberChecker(result: number) {
  expect(result >= 1).toBeTruthy();
  expect(result <= 10).toBeTruthy();
  expect(result.toFixed(0)).toBe(`${result}`);
}

describe("numberHandler", () => {
  it("looks good when checked by a named callback", () => {
    // we run functions with `()`s, so we're calling `getNumber`, and pass
    // it `numberChecker`, but we'll let `getNumber` call `numberChecker` when it's ready.
    getNumber(numberChecker);
    // `getNumber(numberChecker())` would try and get a return from
    //   `numberChecker` to pass `getNumber`!
  });
  it("looks good when checked by an anonymous callback", () => {
    // the anonymous callback works exactly the same way as the named callback.
    // the omnly real negative is the lack of reusability.
    getNumber((result) => {
      expect(result >= 1).toBeTruthy();
      expect(result <= 10).toBeTruthy();
      expect(result.toFixed(0)).toBe(`${result}`);
    });
  });
});
