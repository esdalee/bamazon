DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
product_sales DECIMAL(15,2) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE departments(
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(50) NOT NULL,
over_head_costs INT NOT NULL,
PRIMARY KEY (id)
);

-- Insert 10 diff products
USE bamazon;

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES 
("18-Inch Foam Roller", "Sports & Fitness", 14.99, 1250, 0),
("SPF 45 Water Resistent Sunscreen", "Beauty & Personal Care", "11.99", 1800, 0),
("Wireless Bluetooth Earbuds", "Electronics", 35, 380, 0),
("Allergy Medicine", "Home & Health", 18.65, 430, 0),
("Stainless Charcoal Grill", "Patio, Lawn & Garden", 109, 430, 0),
("Memory Foam Queen Bed", "Home & Kitchen", 495, 180, 0),
("Shiatsu Massager", "Health & Household", 59.99, 470, 0),
("Luggage 3-Piece Set", "Luggage & Travel Gear", 199.99, 350, 0),
("All-in-One Printer", "Office Products", 69.89, 575, 0),
("Stainless Steel Two Door Refrigerator", "Appliances", 166.99, 160, 0);

INSERT INTO departments(department_name, over_head_costs)
VALUES
("Sports & Fitness", 55),
("Beauty & Personal Care", 80),
("Electronics", 100),
("Home & Health", 65),
("Patio, Lawn & Garden", 20),
("Home & Kitchen", 80),
("Health & Household", 50),
("Luggage & Travel Gear", 20),
("Office Products", 30),
("Appliances",70);

-- Check DB
USE bamazon;
SELECT  * from products;
SELECT * from departments;

