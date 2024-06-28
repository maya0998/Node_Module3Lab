const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({users}, null, 4));
 // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});
//Problem f not getting reponce was in res.send("Yet to be implemnted") not commended
// GET by specific ID request: Retrieve a single user with email ID
// router.get("/:email",(req,res)=>{
//    // Extract the email parameter from the request URL
   
//    // Send the filtered_users array as the response to the client
//   return res.send(filtered_users);
//   res.send("Yet to be implemented")//This line is to be replaced with actual return value
// });
router.get("/DOB/:DOB",(req,res)=>{
let DOB=req.params.DOB;
if(DOB!=null){
 let filtered_user=users.filter(u=>u.DOB==DOB);
  return res.send(filtered_user);
}
else{
  return res.send("You must add valid input")
}
});
// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(yyyy + "/" + mm + "/" + dd);
}
// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
  // Sort the users array by DOB in ascending order
  let sorted_users = users.sort(function(a, b) {
      let d1 = getDateFromString(a.DOB);
      let d2 = getDateFromString(b.DOB);
      return d1 - d2;
  });
  // Send the sorted_users array as the response to the client
  res.send(sorted_users);
});

// GET by specific ID request: Retrieve a single user with LastName ID
router.get("/:email/:lastname",(req,res)=>{
  let filtered_users ;
    // Extract the email and lastname  parameters from the request UR
  const email = req.params.email;
  const last = req.params.lastname;
  if(email =="" &&last==""){
    filtered_users=[];
  }
  else if(email!=" ")
 {
    // Filter the users array to find users whose email matches the extracted email parameter
    filtered_users = users.filter((user) => user.email === email);
 }
  else if(last!=null && email==" "){
    // Filter the users array to find users whose email matches the extracted email parameter
     filtered_users = users.filter((user) => user.lastName === last);
  }
  else{
    filtered_users = users.filter((user) => user.lastName === last&&user.email==email);
  }
  // Send the filtered_users array as the response to the client
 return res.send(filtered_users);
 res.send("Yet to be implemented")//This line is to be replaced with actual return value
});
// POST request: Create a new user
router.post("/",(req,res)=>{
  // Push a new user object into the users array based on query parameters from the request
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
});

// Send a success message as the response, indicating the user has been added
res.send("The user " + req.query.firstName + " has been added!");
  //res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  
  if (filtered_users.length > 0) {
      // Select the first matching user and update attributes if provided
      let filtered_user = filtered_users[0];
      
       // Extract and update DOB if provided
      
      let DOB = req.query.DOB;    
      if (DOB) {
          filtered_user.DOB = DOB;
      }
      
      /*
      Include similar code here for updating other attributes as needed
      */
      
      // Replace old user entry with updated user
      users = users.filter((user) => user.email != email);
      users.push(filtered_user);
      
      // Send success message indicating the user has been updated
      res.send(`User with the email ${email} updated.`);
  } else {
      // Send error message if no user found
      res.send("Unable to find user!");
  }
 // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
// Extract the email parameter from the request URL
const email = req.params.email;
// Filter the users array to exclude the user with the specified email
users = users.filter((user) => user.email != email);
// Send a success message as the response, indicating the user has been deleted
res.send(`User with the email ${email} deleted.`);
 // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
