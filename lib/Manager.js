const Employee = require("../lib/Employee.js");

class Manager extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;