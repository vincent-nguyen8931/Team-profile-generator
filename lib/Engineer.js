// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee.js");

class Engineer {
  constructor(name, id, email, GitHubUser) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.GitHubUser = GitHubUser;
  }

  // getGithub() {
  //   return new Engineer(Employee[3](GitHubUser));
  // }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;