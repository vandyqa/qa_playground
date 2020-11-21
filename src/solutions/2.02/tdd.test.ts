describe("palindromeChecker", () => {
  // While the requirements don't specify how spaces or capitals should be
  //   handled, it's not a bad idea to check it!
  // This, really, is something we'd double check with the designer, product
  //   owner, customer, etc.
  it("should return true for palindromes", () => {
    expect(palindromeChecker("tacocat")).toBeTruthy();
    expect(palindromeChecker("  Racecar")).toBeTruthy();
  });
  it("should return false for non-palindromes", () => {
    expect(palindromeChecker("foobar")).toBeFalsy();
    expect(palindromeChecker("this should fail.")).toBeFalsy();
  });
  // Once again, not specifically mentioned in the requirements, and a bit
  //   deeper than we usually need to worry about, as our devs are usually the
  //   ones writing thes tests.
  // That said, checking how nulls or undefined values are handled is good.
  // TypeScript will check for non-string inputs.
  it("should probably return false for non-string inputs too", () => {
    let empty: string;
    expect(palindromeChecker(empty)).toBeFalsy();
    expect(palindromeChecker(null)).toBeFalsy();
  });
});

function palindromeChecker(word: string): boolean {
  if (!word) return false;
  const reversedWord: string = word.trim().split("").reverse().join("");
  return reversedWord.toLowerCase() == word.trim().toLowerCase();
}
