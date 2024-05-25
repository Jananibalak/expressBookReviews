const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

//Task 10
public_users.get("/axiosbooks", function (req,res) {
   
    axios.get("http://localhost:6000/")
    .then(function(response){
      console.log(response.data);
      return res.status(200).json(response.data);
    })
    .catch(function(error){
        console.log(error);
        return res.status(500).json({message: "Error fetching book details."})
    })
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
 //Task 11
public_users.get("/axiosbooks/isbn/:isbn", function (req,res) {
    let isbn = req.params.isbn;
    axios.get("http://localhost:6000/isbn/"+isbn)
    .then(function(response){
      console.log(response.data);
      return res.status(200).json(response.data);
    })
    .catch(function(error){
        console.log(error);
        return res.status(500).json({message: "Error fetching book details."})
    })
  });
 
 // Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author= req.params.author;
  const retBooks=[];
  for(var i=1;i<=10;i++)
  {
    const book = books[i];
    if(book["author"]==author)
    {
        
        retBooks.push(books[i]);
    }
  }
  res.send(retBooks);
});
//Task 12
public_users.get("/axiosbooks/author/:author", function (req,res) {
    let author = req.params.author;
    axios.get("http://localhost:6000/author/"+author)
    .then(function(response){
      console.log(response.data);
      return res.status(200).json(response.data);
    })
    .catch(function(error){
        console.log(error);
        return res.status(500).json({message: "Error fetching book details."})
    })
  });
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title= req.params.title;
  const retBooks=[];
  for(var i=1;i<=10;i++)
  {
    const book = books[i];
    if(book["title"]==title)
    {
        
        retBooks.push(books[i]);
    }
  }
  res.send(retBooks);
});
//Task 12
public_users.get("/axiosbooks/title/:title", function (req,res) {
    let title = req.params.title;
    axios.get("http://localhost:6000/title/"+title)
    .then(function(response){
      console.log(response.data);
      return res.status(200).json(response.data);
    })
    .catch(function(error){
        console.log(error);
        return res.status(500).json({message: "Error fetching book details."})
    })
  });
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send(books[ req.params.isbn]["reviews"]);
});

module.exports.general = public_users;
