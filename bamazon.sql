DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
);

-- Insert 10 diff products
USE bamazon;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 
("18-Inch Foam Roller", "Sports & Fitness", 14.99, 1250),
("SPF 45 Water Resistent Sunscreen", "Beauty & Personal Care", "11.99", 1800),
("Wireless Bluetooth Earbuds", "Electronics", 35, 380),
("Allergy Medicine", "Home & Health", 18.65, 430),
("Stainless Charcoal Grill", "Patio, Lawn & Garden", 109, 430),
("Memory Foam Queen Bed", "Home & Kitchen", 495, 180),
("Shiatsu Massager", "Health & Household", 59.99, 470),
("Luggage 3-Piece Set", "Luggage & Travel Gear", 199.99, 350),
("All-in-One Printer", "Office Products", 69.89, 575),
("Stainless Steel Two Door Refrigerator", "Appliances", 166.99, 160);

-- Check DB
USE bamazon;
SELECT  * from products;

