import { EmployeeHandler } from "./EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
  describe("new tests for challenge 3", () => {
    it("1) can add a new employee", async () => {
      // copied and pasted from the other add employee, just new values
      await em.addEmployee();
      await em.selectEmployeeByName("New Employee");
      await em.editEmployee({
        name: "Harry Potter",
        phone: "9876543210",
        title: "Wizard",
      });
      await em.saveChanges();
      await em.selectEmployeeByName("Dollie Berry");
      await em.selectEmployeeByName("Harry Potter");
      let employee = await em.getEmployeeInfo();
      expect(employee.name).toEqual("Harry Potter");
      expect(employee.phone).toEqual("9876543210");
      expect(employee.title).toEqual("Wizard");
    });
    it("2) can cancel an edit", async () => {
      // copied and pasted from the edit employee test, adding
      // in the method to cancel the edit, and not navigating away/back
      await em.selectEmployeeByName("Bernice Ortiz");
      await em.editEmployee({ title: "Grand Poobah" });
      await em.cancelChanges();
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: 1,
        name: "Bernice Ortiz",
        phone: "4824931093",
        title: "CEO", // when cancelled it should stay the same.
      });
    });
    it("3) can navigate away and back without saving the edit", async () => {
      // copied and pasted from the cancel test, but with a navigate
      // away/back instead of cancelling
      await em.selectEmployeeByName("Bernice Ortiz");
      await em.editEmployee({ title: "Grand Poobah" });
      await em.selectEmployeeByName("Phillip Weaver");
      await em.selectEmployeeByName("Bernice Ortiz");
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: 1,
        name: "Bernice Ortiz",
        phone: "4824931093",
        title: "CEO", // when not saved it should stay the same.
      });
    });
  });
});