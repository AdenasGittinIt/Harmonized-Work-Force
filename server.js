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

const start = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do today?",
      choices: ["1-View employees", 
                "2-View departments", 
                "3-View roles", 
                "4-Add a new employee", 
                "5-Add a new department", 
                "6-Add a new role", 
                "7-Update an employee", 
                "8-Update a role",
                "9-Update a department", 
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
      case "7-Update an employee":
        updateEmployee();
      case "8-Update a role":
        updateEmployee();
        break;
      case "9-Update a department":
        updateEmployee();
        break;
    }
  })
}

const viewEmployee = () => {
  connection.query("SELECT * FROM employee", function (err, response) {
    console.table(response)
    
  })
}

const viewDept = () => {
connection.query("SELECT * FROM department", function (err, response) {
    console.table(response)
  })
}

const viewRoles = () => {
  connection.query("SELECT * FROM role", function (err, response) {
      console.table(response)
    })
  }

const addEmployee = () => {
  lookUpRoleId();
  lookUpEmployee();
  inquirer.prompt([
    {
      type: "input",
      message: "please enter the new employee's first name",
      name: "firstName"
    }, {
      type: "input",
      message: "please enter the new employee's last name",
      name: "lastName"
    }, {
      type: "list",
      message: "Please select the new employee's role",
      choices: role,
      name: "roleChoice"
    }, {
      type: "list",
      message: "To whom will the new employee report",
      choices: employee,
      name: "mngrChoice"
    }
  ]).then(function (userInput) {

    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${userInput.firstName}', '${userInput.lastName}', ${userInput.roleChoice.split('-')[0]}, ${userInput.mngrChoice.split('-')[0]})`, function (err, response) {
      if (err) {
        console.log(err)
      }
      console.log("The new employee is now harmonized with the workforce!")
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
      console.log("The new department is now harmonized for the workforce!")
    })
  })
}

const lookUpRoleId = () => {
  connection.query("SELECT * FROM role", function (err, response) {
    for (let index = 0; index < response.length; index++) {
      role.push(response[index].id + "-" + response[index].title);

    }
  })
}

const lookUpEmployee = () => {
  connection.query("SELECT * FROM employee JOIN role on employee.role_id = role.id", function (err, response) {
    for (let index = 0; index < response.length; index++) {
      employee.push(`${response[index].id}-${response[index].first_name} ${response[index].last_name}, ${response[index].title}`)
    }
  })
}