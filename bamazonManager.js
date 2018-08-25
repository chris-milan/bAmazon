const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon_db'
});
const query = "SELECT * FROM products"

function manager() {
	inquirer
	.prompt({
		name: "action",
		type: "rawlist",
		message: "What would you like to do?",
		choices: [
			"View Products for Sale",
			"View Low Inventory",
			// "Add to Inventory",
			// "Add New Product"
		]
	}).then(function(answer) {
		switch (answer.action) {
		case "View Products for Sale":
			productSearch();
			break;

		case "View Low Inventory":
			lowInventory();
			break;

		case "Add to Inventory":
			addInventory();
			break;

		case "Add New Product":
			newProduct();
			break;
		}
	});
}
function productSearch() {
  // var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
		if(err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log(
			'\x1b[94m','Item ID: ', '\x1b[0m' + '\x1b[36m', res[i].item_id, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Product Name: ', '\x1b[0m' + '\x1b[35m', res[i].product_name, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Department: ', '\x1b[0m' + '\x1b[33m', res[i].department_name, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Price: ', '\x1b[0m' + '\x1b[32m', '$' + res[i].price, '\x1b[0m' + '\n' +
			'\x1b[94m','Quantity: ', '\x1b[0m' + '\x1b[96m', + res[i].stock_quantity, '\x1b[0m' + '\n'
			)
		}
		manager();
  });
}

function lowInventory(){
	connection.query(query, function(err, res) {
		if(err) throw err;
		for (var i = 0; i < res.length; i++) {
			if (res[i].stock_quantity <= 5){
			console.log(
			'\x1b[94m','Item ID: ', '\x1b[0m' + '\x1b[36m', res[i].item_id, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Product Name: ', '\x1b[0m' + '\x1b[35m', res[i].product_name, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Department: ', '\x1b[0m' + '\x1b[33m', res[i].department_name, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Price: ', '\x1b[0m' + '\x1b[32m', '$' + res[i].price, '\x1b[0m' + '\n' +
			'\x1b[94m','Quantity: ', '\x1b[0m' + '\x1b[96m', + res[i].stock_quantity, '\x1b[0m' + '\n'
			)
			}
		}
		manager();
  });

}

function addInventory(){
	
}

manager();