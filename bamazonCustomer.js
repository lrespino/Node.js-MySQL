var mysql = require("mysql");
var inquirer = require('inquirer');
// require("dotenv").config();

var keys = require("./keys.js");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.SQL_KEY,
  database: "bamazon_db"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    run();
  });
  
  function run() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What wold you like to do",
        choices: [
            "Buy products",
            "List products",
            "Exit"
        ]
    }).then(function(answer) {
        switch(answer.action){
            case "Buy products":
                buyProducts();
                break;
            case "List products":
                allProducts();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
};

function allProducts() {
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        for (var i = 0; i<res.length; i ++){
        console.log("ID: " + res[i].item_id + "\nproduct_name" + res[i].product_name + "\nDepartment Name: " + res[i].department_name + "\nPrice: " + res[i].price.toFixed(2) + "\nStock Quantity: " + res[i].stock_quantity + "\n--------")
        }
    });
    connection.end();
};

function buyProducts() {
    inquirer.prompt([
        {
        name: "item_ID",
        type: "input",
        message: " What is the item of the item you would like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        },
        {
        name: "amount",
        type: "input",
        message: "How many items would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        }
    ]).then (function(res) {
        checkStore(res.item_ID, res.amount)
    })
};

function checkStore(id, quantity) {
    connection.query("SELECT *  FROM products WHERE ?", 
    {item_id: id},
        function(err,res){
        if (err) throw err; 
    
        res.forEach(element =>{
            if (quantity <= element.stock_quantity) {
                console.log("There are enough " + element.product_name + " to purchase in stock")
                updateStore(quantity, id, element.stock_quantity, element.price.toFixed(2))
            }
            else {
                console.log("Sorry! We don't have enough stock of that item!")
                run()
            }
        })
    });
};

function updateStore(quantity, id, store_quantity, price) {
connection.query("UPDATE products SET ? WHERE ?",
    [{
        stock_quantity: store_quantity - quantity
    },
    {
        item_id:id
    },
    ],)
    var total= price *quantity
    console.log("Thank You for your order! Your total is $" + total.toFixed(2))
    buyAgain();
}

function buyAgain() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Whould you like to buy again?",
        choices: [
            "Yes",
            "No",
            "Main Menu",
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Yes":
                buyProducts();
                break;
            case "No":
                connection.end();
                break;
            case "Main Menu":
                run();
                break;
        }
    });
}
  