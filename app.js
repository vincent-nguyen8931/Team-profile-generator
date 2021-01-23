const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
  },
 
];

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

const callChooseEmployee = () => 
  inquirer.prompt([
{
  type: 'list',
  message: 'Which member would you like to add?',
  choices: ["Engineer", "Intern", "Finish adding"],
  name: 'teamAdd',
}
]).then((response) => {
  // while (response.teamAdd !== "Finish adding"){
    
    if (response.teamAdd === "Engineer"){
      inquirer.prompt(engineerQuestions).then(() => {
        callChooseEmployee();
      })
    }
    if (response.teamAdd === "Intern"){
      inquirer.prompt(internQuestions).then(() => {
        callChooseEmployee();
      })
    }
    if (response.teamAdd === "Finish adding") {
      console.log("Loop test successful.")
      return;
    }
  // }
}
)

inquirer.prompt(initialQuestions)
.then(() => {
  callChooseEmployee()
}
);




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// render();
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
