// future dev... add figlet "graphics"
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "harmonize_wf_db"
});

connection.connect(function (error) {
  if (error) {
    console.log(error)
  }
  console.log("Connected as id", connection.threadId)
  start();
})

const role = [];
const employee = [];
const dept = [];

const start = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "Keep your workforce humming along in perfect harmoney! Select an option below.",
      choices: ["1-View employees", 
                "2-View departments", 
                "3-View roles", 
                "4-Add a new employee", 
                "5-Add a new department", 
                "6-Add a new role", 
                "7-Update an employee's role", 
              ],
      name: "choice"
    }
  ]).then(function (userInput) {
    console.log(userInput.choice)
    switch (userInput.choice) {
      case "1-View employees":
        viewEmployee();
        break;
      case "2-View departments":
        viewDept();
        break;
      case "3-View roles":
        viewRoles();
        break;
      case "4-Add a new employee":
        addEmployee();
        break;
      case "5-Add a new department":
        addDept();
        break;
      case "6-Add a new role":
        addRole();
        break;
      case "7-Update an employee's role":
        updateEmployee();
        break;
    }
  })
}

const viewEmployee = () => {
  connection.query("SELECT * FROM employee", function (err, response) {
    console.table(response);
    whatNext();
  })
}

const viewDept = () => {
connection.query("SELECT * FROM department", function (err, response) {
    console.table(response);
    whatNext();
  })
}

const viewRoles = () => {
  connection.query("SELECT * FROM role", function (err, response) {
    console.table(response);
    whatNext();
  })
}

const addEmployee = () => {
  lookUpRoleId();
  lookUpEmployee.then((employee) => {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter the new employee's first name:",
        name: "firstName"
      }, {
        type: "input",
        message: "please enter the new employee's last name:",
        name: "lastName"
      }, {
        type: "list",
        message: "Please select the new employee's role:",
        choices: role,
        name: "roleChoice"
      }, {
        type: "list",
        message: "To whom will the new employee report?",
        choices: employee,
        name: "mngrChoice"
      }
    ]).then(function (userInput) {
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${userInput.firstName}', '${userInput.lastName}', ${userInput.roleChoice.split('-')[0]}, ${userInput.mngrChoice.split('-')[0]})`, function (err, response) {
        if (err) {
          console.log(err)
        }
        console.log("The new employee is now harmonized with the workforce!");
        empty(employee);
        empty(role);
        whatNext();
      })
    })
  })
}

const addDept = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "What would you like to call the new department?",
      name: "deptName"
    }
  ]).then(function (userInput) {

    connection.query(`INSERT INTO department (department_name) VALUES ('${userInput.deptName}')`, function (err, response) {
      if (err) {
        console.log(err)
      }
      console.log(`The new department number is ${response.insertId} and is now harmonized for the workforce!`);
      whatNext();
    })
  })
}

const addRole = () => {
  lookUpDeptId();
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter the new role's title",
      name: "title"
    }, {
      type: "input",
      message: "What is the annual salary for this new role?",
      name: "salary"
    }, {
      type: "list",
      message: "To which department will the new role belong?",
      choices: dept,
      name: "deptChoice"
    }, 
  ]).then(function (userInput) {
    connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${userInput.title}', '${userInput.salary}', ${userInput.deptChoice.split('-')[0]})`, function (err, response) {
      if (err) {
        console.log(err)
      }
      console.log(`The new role's ID number is ${response.insertId} and is now harmonized for the workforce!`);
      whatNext();
    })
  })
}

const updateEmployee = () => {
  lookUpRoleId();
  lookUpEmployee.then((employee) => {
    inquirer.prompt([
      {
        type: "list",
        message: "Which Employee would you like to update?",
        choices: employee,
        name: "eeToUpdate"
      }, {
        type: "list",
        message: "Please select the employee's new role",
        choices: role,
        name: "newRole"
      }])
      .then(function (userInput) {
        let eeID = userInput.eeToUpdate.split(' - ')[0]
        let newRoleId = userInput.newRole.split(' - ')[0]
        connection.query(`UPDATE employee SET role_id = ${newRoleId} WHERE ${eeID} = employee.id`, function (err, response) {
          if (err) {
            console.log(err)
          }
          console.log("The employee is now harmonized in their new role!");
          empty(employee);
          empty(role);
          whatNext();
        })
      })
  })
}

const lookUpRoleId = () => {
  connection.query("SELECT * FROM role", function (err, response) {
    for (let i = 0; i < response.length; i++) {
      role.push(`${response[i].id} - ${response[i].title} with an annual salary of ${response[i].salary}`)

    }
  })
}

let lookUpEmployee = new Promise((resolve, reject) => {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id", function (err, response) {
    for (let i = 0; i < response.length; i++) {
      employee.push(`${response[i].id} - ${response[i].first_name} ${response[i].last_name}, ${response[i].title}`)
      resolve(employee)
    }
  })
});

const lookUpDeptId = () => {
  connection.query("SELECT * FROM department", function (err, response) {
    for (let i = 0; i < response.length; i++) {
      dept.push(response[i].id + "-" + response[i].department_name);

    }
  })
}

const empty = (array) => {
    array.length = 0;
}

function whatNext() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do next?",
      choices: ["Continue Harmonizing!", "That's enough harmony for today, please exit."],
      name: "nextAction"
    }])
    .then(function (userInput) {
      switch (userInput.nextAction) {
        case "Continue Harmonizing!":
          start();
          break;
        case "That's enough harmony for today, please exit.":
          connection.end(function(err) {
            if (err) {
              console.log(err);
            }
          })
          break;
      }
    })
}