// Initialize dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table");

// Set up connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

// Display menu options
inquirer.prompt([
    {
        name: "selection",
        type: "list",
        choices: ["View Product Sales by Department", "Create New Department"]
    }
]).then(function(res){

    switch (res.selection){
        // Run function for selected option
        case "View Product Sales by Department":
            viewProductSales();
            break;

        case "Create New Department":
            break;

    };
});

function viewProductSales(){

    connection.query("SELECT * from department WHERE stock_quantity < ?", 5, function(err, response){



    });

    import {
        table
    } from "table";

    let data,
        output;

    data = [

    ];
    output = table(data);
    console.log(output);
};