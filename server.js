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
  console.log("Connected as id", connection.threadId, "Let's begin!")
  start();
})

const role = [];
const employee = [];
const dept = [];

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
        break;
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
      //console log 
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
      console.log(`The new department number is ${response.insertId} and is now harmonized for the workforce!`);
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
      console.log(`The new role's ID number is ${response.insertId} and is now harmonized for the workforce!`)
    })
  })
}

const lookUpRoleId = () => {
  connection.query("SELECT * FROM role", function (err, response) {
    for (let index = 0; index < response.length; index++) {
      role.push(`${response[index].id} - ${response[index].title} with an annual salary of ${response[index].salary}`);
    }
  })
}

const updateEmployee = () => {
  lookUpEmployee.then((employee) => {
  inquirer.prompt([
    {
      type: "list",
      message: "Which Employee would you like to update?",
      choices: employee,
      name: "eeToUpdate"
    }, {
      type: "list",
      message: "What information would you like to update?",
      choices: ["First name", "Last name", "Role"],
      name: "infoToUpdate"
    }
  ]).then(console.log(employee));
})}

  const lookUpDeptId = () => {
  connection.query("SELECT * FROM department", function (err, response) {
    for (let i = 0; i < response.length; i++) {
      dept.push(response[i].id + "-" + response[i].department_name);

    }
  })
}

let lookUpEmployee = new Promise((resolve, reject) => {      
  connection.query("SELECT * FROM employee JOIN role on employee.role_id = role.id", function (err, response) {
    for (let index = 0; index < response.length; index++) {
      employee.push(`${response[index].id}-${response[index].first_name} ${response[index].last_name}, ${response[index].title}`)
      resolve(employee)
    }
  })
});