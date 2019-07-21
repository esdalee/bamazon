// Initialize dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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

    connection.query("SELECT * from departments LEFT JOIN products ON departments.department_name = products.department_name", function(err, response){

        if (err) throw err
    
        var table = new Table({

            head: ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"]

        });

        // console.log(JSON.stringify(response));
        // Push results into a table array
        for (var i=0; i<response.length; i++) {
            var totalProfit = response[i].product_sales - response[i].over_head_costs;
            table.push(
                [response[i].id, response[i].department_name, response[i].over_head_costs, response[i].product_sales, totalProfit]
            );
        };

        // Log table of results
        console.log(table.toString());

        // End connection
        connection.end();
    });
};