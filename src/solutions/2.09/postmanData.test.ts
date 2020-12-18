import { EmployeeManager } from "./pageObjects/EmployeeManager";

const page = new EmployeeManager("chrome");

const employees = [
  {
    employee_id: 10001,
    employee_name: "Petra Arkanian",
    employee_phone: "1231231234",
    employee_email: "test@email.com",
    employee_title: "Screenshot",
  },
  {
    employee_id: 617,
    employee_name: "Claude Von Riegan",
    employee_phone: "8320000000",
    employee_email: "abcd@gmail.com",
    employee_title: "Screenshot",
  },
  {
    employee_id: 10003,
    employee_name: "Nelkjlkjweq",
    employee_phone: "1111111111",
    employee_email: "abc",
    employee_title: "New Employee",
  },
  {
    employee_id: 623,
    employee_name: "Eve Sparks",
    employee_phone: "8734567810",
    employee_email: "SparkleSunshine@yahoo.com",
    employee_title: "Product Manager",
  },
  {
    employee_id: 61,
    employee_name: "Phillip Weaver",
    employee_phone: "7459831843",
    employee_email: "theWeavester@gmail.com",
    employee_title: "Manager",
  },
  {
    employee_id: 622,
    employee_name: "Lou White",
    employee_phone: "8727813498",
    employee_email: "LouLou@yahoo.com",
    employee_title: "Full-Stack Developer",
  },
  {
    employee_id: 14,
    employee_name: "Marnie Barnett",
    employee_phone: "3094812387",
    employee_email: "mbarnett@hotmail.com",
    employee_title: "Screenshot",
  },
  {
    employee_id: 833,
    employee_name: "Any One",
    employee_phone: "1111111111",
    employee_email: "abc",
    employee_title: "qrpt1",
  },
  {
    employee_id: 684,
    employee_name: "John Doe",
    employee_phone: "1111111111",
    employee_email: "john@doe.com",
    employee_title: "Turtle Wrangler",
  },
  {
    employee_id: 231,
    employee_name: "Dimitri Blaiddyd",
    employee_phone: "2815555555",
    employee_email: "BoarPrince@hotmail.com",
    employee_title: "King of Faerghus",
  },
  {
    employee_id: 5,
    employee_name: "Bernice Ortiz",
    employee_phone: "4824931093",
    employee_email: "bortiz@gmail.com",
    employee_title: "CEO",
  },
  {
    employee_id: 230,
    employee_name: "Teresa Osborne",
    employee_phone: "3841238745",
    employee_email: "Terborne@yahoo.com",
    employee_title: "Director of Engineering",
  },
  {
    employee_id: 519,
    employee_name: "Dollie Berry",
    employee_phone: "4873459812",
    employee_email: "DollBerry@yahoo.com",
    employee_title: "Front-End Developer",
  },
  {
    employee_id: 598,
    employee_name: "Harriett Williamson",
    employee_phone: "6571249801",
    employee_email: "HmicWilliam@gmail.com",
    employee_title: "Front-End Developer",
  },
];

describe("checking that the UI matches the DB", () => {
  beforeEach(async () => await page.navigate());
  afterAll(async () => await page.driver.quit());
  for (let i = 0; i < employees.length; i++) {
    test(`Looking for ${employees[i].employee_name} in the UI`, async () => {
      await page.selectEmployee(employees[i].employee_name);
      let employee = await page.getCurrentEmployee();
      expect(employee.id).toEqual(employees[i].employee_id.toString());
      expect(employee.name).toEqual(employees[i].employee_name);
      expect(employee.phone.toString()).toEqual(employees[i].employee_phone);
      expect(employee.email).toEqual(employees[i].employee_email);
      expect(employee.title).toEqual(employees[i].employee_title);
    });
  }
});
