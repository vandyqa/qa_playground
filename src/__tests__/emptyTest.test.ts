beforeAll(() => {
  //this would happen before ANY test in this file
});

afterAll(() => {
  //this would happen after ALL tests in this file
});

describe("something you'll test a few times", () => {
  beforeEach(() => {
    //do some setup here
  });
  it("does x", () => {});
  it("does y", () => {});
});

test("test is best for standalone tests", () => {});
