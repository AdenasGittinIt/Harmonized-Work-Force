
// Build a command-line application that at a minimum allows the user to:

// DONE View departments, 
// DONE roles, 
// DONE employees



// DONE Add departments, 
  //LIGHT BULB after I create the new department, I want to run a function to get the new department's id#
    //the response from the db includes the id number of the inserted row.  I discovered this by console logging the response.  I'm untilizing the ID by conosole logging res.id
  
  
  //and perhaps display the new department in the full list of departmemts.  Is there CLI code I can use to highlight the new depatment name on the list?

 
// DONE roles, 
// DONE employees

// Update employee roles
//to update an eployee's role I have to look up and list employees and use them in my inquiror prompt. Select the employee you'd like to update.  

//BUG the inquirer prompt that asked which EE the user wants to update displayed twice.  This was because the 'break' was missing from the switch case associated with updating an employee

// I need to also look up and list the current roles available and list them in an inquirer prompt.  (select the employee's new role) BONUS - would you like to update the employee's role or manager

//I then need to run a fuction to update the employee table where the id matches the selected employee's id





// Bonus points if you're able to:


// Update employee managers


// View employees by manager


// Delete departments, roles, and employees


// View the total utilized budget of a department -- ie the combined salaries of all employees in that department






.then(function (userInput) {

  var sql = connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${userInput.firstName}', '${userInput.lastName}', ${userInput.roleChoice.split('-')[0]}, ${userInput.mngrChoice.split('-')[0]})`, function (err, response) {
    if (err) {
      console.log(err)
    }
    console.log("Employee Added!")
  })
  console.log(sql)
})

//After completing an action I want to ask the user what they'd like to next.

//prompt them for what they want to do next
//choices are restart the app or exit


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
    }])

    // salary is not currently saved as a decimal.  I also would like a thousands separator.


//OLD
    const lookUpEmployee = () => {
      connection.query("SELECT * FROM employee JOIN role on employee.role_id = role.id", function (err, response) {
        for (let index = 0; index < response.length; index++) {
          employee.push(`${response[index].id}-${response[index].first_name} ${response[index].last_name}, ${response[index].title}`)
        }
      })
    }

    //NEW

    let lookUpEmployee = new Promise((resolve, reject) => {      
      connection.query("SELECT * FROM employee JOIN role on employee.role_id = role.id", function (err, response) {
        for (let index = 0; index < response.length; index++) {
          employee.push(`${response[index].id}-${response[index].first_name} ${response[index].last_name}, ${response[index].title}`)
          resolve(employee)
        }
      })
    });


    myFirstPromise.then((successMessage) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      console.log("Yay! " + successMessage);
    });

