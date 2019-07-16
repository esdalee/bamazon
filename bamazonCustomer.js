// Initialize dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// Set up connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

// Display all items available for sale 
connection.query("SELECT * FROM products", function(err,res){
    // Error handler
    if (err) console.log("error: ", err);

    console.log(res);
    // Display id, name, price of product
    for (var i=0;i<res.length;i++) {
        console.log("ID: " + res[i].id + "\nProduct Name: " + res[i].product_name + "\nPrice: " + "$" + res[i].price + "\n\n");
    };

    // End connection
    connection.end();
});

// Prompt user
inquirer.prompt([
    {
        name: "id",
        type: "input",
        message: "What's the ID of the product?",
        validate: function(value){
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function(value){
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }
]).then(function(res){

    console.log(res.id, res.quantity);

    connection.query("SELECT * FROM products", function(err, response) {

        

    });
});
