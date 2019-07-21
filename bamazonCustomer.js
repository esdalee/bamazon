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
    if (err) throw err;

    // console.log(res);
    // Display id, name, price of product
    for (var i=0;i<res.length;i++) {
        console.log("ID: " + res[i].id + "\nProduct Name: " + res[i].product_name + "\nPrice: " + "$" + res[i].price + "\n\n");
    };

    // Prompt user
    inquirer.prompt([
        {
            // Get ID of product
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
            // Get quantity of units for the product
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
        // Check for the ID & Quantity
        // console.log(res.id, res.quantity);

        var productID = res.id;
        var quantity = parseInt(res.quantity);

        // Set connection query to filter for product ID
        connection.query("SELECT * FROM products WHERE id = ?", productID, function(err, response) {

            // console.log(response);

            // Error handler
            if (err) throw err;

            // Check if there's enough units in stock
            // Handle insufficient quantity
            if (quantity > response[0].stock_quantity) {
                console.log("Insufficient Quantity! Please select a smaller amount");
                return false;
            }
            else {

                // Update DB
                var newQuantity = response[0].stock_quantity-quantity;
                connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, productID], function(err, data){

                    if (err) throw err;

                    // Total cost
                    console.log("Order is successfully placed! Total cost is: $" + response[0].price*quantity + "\n\n");

                    // End connection
                    connection.end();

                });
            }
        });
    });
});

