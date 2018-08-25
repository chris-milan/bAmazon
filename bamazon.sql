CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	item_id INTEGER(15) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(70) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(15) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Hydro Flask', 'Fitness', 45.93, 725),
		('Yoga Pants', 'Fitness', 18.98, 999),
		('Basic Dumbbells', 'Fitness', 8.49, 122),
		('Fire Stick', 'Electronics', 39.99, 550),
		('Wyze Cam', 'Electronics', 31.99, 205),
		('4-Port USB 3.0', 'Electronics', 9.99, 99),
		('120 Can Beverage Center', 'Appliances', 179.99, 48),
		('Countertop Microwave', 'Appliances', 63.13, 8039),
		('Top Loading Water Cooler Dispenser', 'Appliances', 126.26, 333),
		('Financial Calculator', 'Office Products', 29.99, 639),
		('Electric Pencil Sharpener', 'Office Products', 24.95, 2020),
		('High Yield Original Ink Cartridge', 'Office Products', 38.39, 4591),
		('WORX WORXSAW', 'Tools & Home Improvement', 50.23, 25),
		('Oil-Free UMC Pancake Compressor', 'Tools & Home Improvement', 79.00, 4),
		('Black & Decker BDCDD12C 12V MAX Lithium Drill ', 'Tools & Home Improvement', 29.99, 983);