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

// Display menu options
inquirer.prompt([
    {
        name: "selection",
        type: "list",
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
    }
]).then(function(res){
    
    // console.log("res: " + JSON.stringify(res));

    switch (res.selection) {
        // Run function for selected option
        case "View Products for Sale":
            viewProducts();
            break;

        case "View Low Inventory":
            lowInventory();
            break;

        case "Add to Inventory":
            addInventory();
            break;

        case "Add New Product":
            addProduct();
            break;
    }
});

// View Products for Sale
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, response){
        if (err) throw err;

        for (var i=0; i<response.length; i++) {
            if (response[i].stock_quantity > 0 ) {
                console.log("ID: " + response[i].id + "\nProduct Name: " + response[i].product_name + "\nPrice: " + "$" + response[i].price + "\nQuantity: "+ response[i].stock_quantity + "\n\n");
            }; 
        };

        // End connection
        connection.end();
    });
};

// View Low Inventory
function lowInventory(){
    connection.query("SELECT * from products WHERE stock_quantity < ?", 5, function(err, response){
        if (err) throw err;

        if (response.length) {
            for (var i=0; i<response.length; i++ ){
                console.log("Supply is low on these products:\n" + "ID: " + response[i].id + "\nProduct Name: " + response[i].product_name + "\nPrice: " + "$" + response[i].price + "\nQuantity: "+ response[i].stock_quantity + "\n\n");
            };
        }

        else {
            console.log("Nothing is running low!")
        };
            
        // End connection
        connection.end();
    });
};

// Add to Inventory
function addInventory(){

    // Give manager option to add more inventory
    inquirer.prompt([
        {
            // Get ID of product to refill
            name: "id",
            type: "input",
            message: "What's the ID of the product you want to restock?",
            validate: function(value){
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            // Get ID of product to refill
            name: "quantity",
            type: "input",
            message: "How many units do you want to add?",
            validate: function(value){
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }   
    ]).then(function(res){

        var productID = res.id;
        var addQuantity = parseInt(res.quantity);

        connection.query("SELECT * FROM products WHERE id = ?", productID, function(err, data) {

            if (err) throw err;

            // If ID exists in the inventory then add quantity to the product
            if (data) {

                var newQuantity = data[0].stock_quantity+addQuantity;
                
                connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, productID], function(err, res){

                    if (err) throw err;

                    console.log("Stock quantity updated! Total quantity for " + data[0].product_name + "is now: " + newQuantity + "\n\n");
                });
            }
            else {
                console.log("The product does not exist in the inventory.")
            };

        // End connection
        connection.end();
        });
    });
};

// Add New Product
function addProduct(){

    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What's the name of the product?"
        },
        {
            name: "department",
            type: "input",
            message: "Which department?"
        },
        {
            name: "price",
            type: "input",
            message: "What's the price",
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
            message: "How many?",
            validate: function(value){
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(res){

        var product = res.product;
        var department = res.department;
        var price = res.price;
        var quantity = res.quantity;

        // Add to DB
        connection.query("INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [product, department, price, quantity], function(err, data){
            
            if (err) throw err;

            console.log("New product has successfully been added!")

            // End connection
            connection.end();
        });
    });
};
