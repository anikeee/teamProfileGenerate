const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// Prompt user for information about the team manager
inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's employee ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the team manager's office number?",
        },
    ])
    .then((answers) => {
        // Create a new Manager object and add it to the teamMembers array
        const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );
        teamMembers.push(manager);

        // Call function to prompt user for information about an engineer
        promptEngineer();
    })
    .catch((error) => {
        console.log(error);
    });

// Function to prompt user for information about an engineer
function promptEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the engineer's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the engineer's employee ID?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineer's email address?",
            },
            {
                type: "input",
                name: "github",
                message: "What is the engineer's GitHub username?",
            },
            {
                type: "list",
                name: "addMember",
                message: "Would you like to add another team member?",
                choices: ["Engineer", "Intern", "Finish building team"],
            },
        ])
        .then((answers) => {
            // Create a new Engineer object and add it to the teamMembers array
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
            );
            teamMembers.push(engineer);

            // Determine what type of team member to add next based on user's choice
            if (answers.addMember === "Engineer") {
                promptEngineer();
            } else if (answers.addMember === "Intern") {
                promptIntern();
            } else {
                // Call function to render HTML and write to file
                const html = render(teamMembers);
                fs.writeFile(outputPath, html, (err) => {
                    if (err) throw err;
                    console.log("Team profile generated!");
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// Function to prompt user for information about an intern
function promptIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the intern's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the intern's employee ID?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the intern's email address?",
            },
            {
                type: "input",
                name: "school",
                message: "What school does the intern attend?",
            },
            {
                type: "list",
                name: "addMember",
                message: "Would you like to add another team member?",
                choices: ["Engineer", "Intern", "Finish building team"],
            },
        ])
        .then((answers) => {
            // Create a new Intern object and add it to the teamMembers array
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            teamMembers.push(intern);

            // Determine what type of team member to add next based on user's choice
            if (answers.addMember === "Engineer") {
                promptEngineer();
            } else if (answers.addMember === "Intern") {
                promptIntern();
            } else {
                // Call function to render HTML and write to file
                const html = render(teamMembers);
                fs.writeFile(outputPath, html, (err) => {
                    if (err) throw err;
                    console.log("Team profile generated!");
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}



