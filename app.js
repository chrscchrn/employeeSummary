const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function addManager() {
    return inquirer.prompt([
        { 
            message: "Enter your managers name",
            name: "managerName"
        },
        {
            message: "Enter their employee ID",
            name: "managerID"
        },
        {
            message: "Enter their email",
            name: "managerEmail"
        },      
        {
            message: "Enter the office number",
            name: "officeNumber"
        }
    ])
    .then(function(response) {
        const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response.officeNumber)
        employees.push(manager);
        promptUser();
    });
}

function addEngineer() {
    return inquirer.prompt([
        {
            message: "Enter your engineer's name",
            name: "name"
        },
        {
            message: "Enter their employee ID",
            name: "id"
        },
        {
            message: "Enter their email",
            name: "email"
        },
        {
            message: "Enter their Github username",
            name: "github"
        }
    ])
    .then(function(response) {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        promptUser();
    });
}

function addIntern() {
    return inquirer.prompt([
        {
            message: "Enter your intern's name",
            name: "name"
        },
        {
            message: "Enter their employee ID",
            name: "id"
        },
        {
            message: "Enter their email",
            name: "email"
        },
        {
            message: "Enter what school they went to",
            name: "school"
        }
    ])
    .then(function(response) {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        promptUser();
    });
}

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What type of employee would you like to add next?",
            choices: ["Engineer", "Intern", "I don't have any more employees."],
            name: "employeeType"
        }
    ])
    .then(function(response) {
        if (response.employeeType == 'Intern') {
            addIntern();
        }
        else if (response.employeeType == 'Engineer') {
            addEngineer();
        }
        else {
            fs.writeFile(outputPath, render(employees), function (err) {
            if (err) {
                console.log(err);
            }
        });
        console.log("Success, you have a team!");
    }});
}

addManager();

