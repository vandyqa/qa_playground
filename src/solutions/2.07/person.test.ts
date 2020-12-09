import * as person from "./person.json";

test("json", () => {
  expect(person.firstName).toBe("John");
});
