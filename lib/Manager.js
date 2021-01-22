const Employee = require("../lib/Employee.js");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;