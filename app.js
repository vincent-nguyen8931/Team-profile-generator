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

// Prompt for manager information upon the app being called in terminal.
inquirer.prompt(initialQuestions)
  .then(res => {
    const manager = new Manager(res.managerName, res.managerID, res.managerEmail, res.managerOfficeNumber);
    selectedEmployees.push(manager);
    chooseEmployee()
  });

// Gives user a list of options to choose from when adding an employee. This will loop continually until "Finish adding" is selected. Each iteration will push the information onto an array.
const chooseEmployee = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Which member would you like to add?',
      choices: ["Engineer", "Intern", "Finish adding"],
      name: 'teamAdd',
    }
  ]).then(response => {
    // When the user chooses Engineer, the inquirer asks the engineer specific questions defined above then appends the information to a new Engineer object. That is pushed onto the selectedEmployees array and the function is called again.
    if (response.teamAdd === "Engineer") {
      inquirer.prompt(engineerQuestions).then(res => {
        const engineer = new Engineer(res.engineerName, res.engineerID, res.engineerEmail, res.engineerGithub)
        selectedEmployees.push(engineer);
        chooseEmployee();
      })
    }

     // When the user chooses Intern, the inquirer asks the intern specific questions defined above then appends the information to a new Intern object. That is pushed onto the selectedEmployees array and the function is called again.
    if (response.teamAdd === "Intern") {
      inquirer.prompt(internQuestions).then(res => {
        const intern = new Intern(res.internName, res.internID, res.internEmail, res.internSchool)
        selectedEmployees.push(intern);
        chooseEmployee();
      })
    }

     // When the user chooses Finish adding, the responses that have been gathered in selectedEMployees is written to the file team.html in the output folder. Then the console log will inform the user on where to find the file in their directory. 
    if (response.teamAdd === "Finish adding") {
      fs.writeFile(outputPath, render(selectedEmployees), (err) => {
        if (err) throw err;
        console.log("File wrote successfully to /output/team.html");
      });
    };
  });
};
