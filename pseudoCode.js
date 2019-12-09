import { resolve } from "dns"

// Build a command-line application that at a minimum allows the user to:

// DONE View departments, 
// DONE roles, 
// DONE employees



// DONE Add departments, 
  //after I create the new department, I want to run a function to get the new department's id#
    //the response from the db includes the id number of the inserted row.  I discovered this by console logging the response.  I'm untilizing the ID by conosole logging res.id
  
  
  //and perhaps display the new department in the full list of departmemts.  Is there CLI code I can use to highlight the new depatment name on the list?

 
// DONE roles, 
// DONE employees





// Update employee roles

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

