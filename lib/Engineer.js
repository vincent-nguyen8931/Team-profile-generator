// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee.js");

class Engineer {
  constructor(name, id, email, github) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.github = github;
  }

  getGithub() {
    return github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;