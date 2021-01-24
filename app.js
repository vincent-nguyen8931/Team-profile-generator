const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let selectedEmployees = [];

// Questions that asks for manager's information
const initialQuestions = [
  {
    type: 'input',
    message: 'Enter the team manager\'s name: ',
    name: 'managerName',
  },
  {
    type: 'input',
    message: 'Team manager\'s employee ID: ',
    name: 'managerID',
  },
  {
    type: 'input',
    message: 'Team manager\'s e-mail: ',
    name: 'managerEmail',
  },
  {
    type: 'input',
    message: 'Team manager\'s office number: ',
    name: 'managerOfficeNumber',
  }
];

// Questions that asks for engineer's information
const engineerQuestions = [
  {
    type: 'input',
    message: 'Enter the engineer\'s name: ',
    name: 'engineerName',
  },
  {
    type: 'input',
    message: 'engineer\'s employee ID: ',
    name: 'engineerID',
  },
  {
    type: 'input',
    message: 'engineer\'s e-mail: ',
    name: 'engineerEmail',
  },
  {
    type: 'input',
    message: 'engineer\'s Github username: ',
    name: 'engineerGithub',
  }
];

// Questions that asks for intern's information
const internQuestions = [
  {
    type: 'input',
    message: 'Enter the intern\'s name: ',
    name: 'internName',
  },
  {
    type: 'input',
    message: 'intern\'s employee ID: ',
    name: 'internID',
  },
  {
    type: 'input',
    message: 'intern\'s e-mail: ',
    name: 'internEmail',
  },
  {
    type: 'input',
    message: 'intern\'s school name: ',
    name: 'internSchool',
  }
];

// Gives user a list of options to choose from when adding an employee. This will loop continually until "Finish adding" is selected. Each iteration will push the information onto an array.
const callChooseEmployee = () =>
  inquirer.prompt([
    {
      type: 'list',
      message: 'Which member would you like to add?',
      choices: ["Engineer", "Intern", "Finish adding"],
      name: 'teamAdd',
    }
  ]).then(response => {
    if (response.teamAdd === "Engineer") {
      inquirer.prompt(engineerQuestions).then(res => {
      const engineer = new Engineer(res.engineerName, res.engineerID, res.engineerEmail, res.engineerGithub)
        selectedEmployees.push(engineer);
        console.log(selectedEmployees);
        callChooseEmployee();
      })
    }
    if (response.teamAdd === "Intern") {
      inquirer.prompt(internQuestions).then(res => {
        const intern = new Intern(res.internName, res.internID, res.internEmail, res.internSchool)
        selectedEmployees.push(intern);
        console.log(selectedEmployees);
        callChooseEmployee();
      })
    }
    if (response.teamAdd === "Finish adding") {
      render(selectedEmployees);
      fs.writeFile(outputPath);
      return;
    }
  });

  inquirer.prompt(initialQuestions)
     .then(res => {
       const manager = new Manager(res.managerName, res.managerID, res.managerEmail, res.managerOfficeNumber)
      selectedEmployees.push(manager);
     console.log(selectedEmployees);
      callChooseEmployee()
    })
  


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
