const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon_db'
});

function bAmazon() {

	var query = 'SELECT * FROM products';
	var quantityAmount = "";

	// Connecting and making query to bamazon_db
	connection.query(query, function(err, res) {
		if (err) throw err;

		console.log('\x1b[36m','\n------ BAmazon Inventory: ------\n');
		for (var i = 0; i < res.length; i++) {
			console.log(
			'\x1b[94m','Item ID: ', '\x1b[0m' + '\x1b[36m', res[i].item_id, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Product Name: ', '\x1b[0m' + '\x1b[35m', res[i].product_name, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Department: ', '\x1b[0m' + '\x1b[33m', res[i].department_name, '\x1b[0m' + ' |  ' +
			'\x1b[94m','Price: ', '\x1b[0m' + '\x1b[32m', '$' + res[i].price, '\x1b[0m' + '\n'
			)
		}
		  console.log('\x1b[34m',"--------------------------------------------------------------------------------------------------------------------------------------------------\n");
		 
	inquirer
		.prompt([
		{
			name: 'item_id',
			type: 'input',
			message: ('\x1b[92m') + 'Type the ITEM ID of the product you would you like to buy.',
			validate: function(value){
				
			if (isNaN(value) || (value > res.length)) {
				console.log('\x1b[31m', "\n\nYou didn't pick an ITEM ID within the BAmazon Inventory.\n");
				return false;
				
			  } else if (res[value - 1].stock_quantity === 0){
				console.log('\x1b[31m', "\n\nSorry, this product is currently out of stock.\n")
				return false;
			  } 
			  
			  else {
				quantityAmount = res[value - 1].stock_quantity;
				return true;		
			  }
		  },
		},
		
		{
			name: 'amount',
			type: 'input',
			message: ('\x1b[92m') + 'How many units of this product would you like to buy?',
			validate: function(value){
				if (isNaN(value)){
				  return false;
				} 

				else if (value > quantityAmount){
					console.log('\x1b[31m', "\n\nThe amount you chose exceeds the current stock quantity. Please choose an amount less than " + (quantityAmount + 1) + ".\n")
					return false;
				}
				else {
				  return true;
				}
			}
		}
		
	]).then(function(value) {
	//declaring a variable that contains the stock quantity - minus the user's chosen quantity	
	var newQuantity = res[value.item_id - 1].stock_quantity - value.amount
	
	//declaring a varable that contains the exact item_id based on users' choice
	var itemID = res[value.item_id - 1].item_id
	
	// console.log(newQuantity)
	// console.log(itemID)
	
		//updates new stock quanitity
		connection.query("UPDATE products SET ? WHERE ?", [
			{
				stock_quantity: newQuantity
			},
			{
				item_id: itemID
			}

	],function(err, result){
		if(err) throw err;
		// calculates users chosen quantity * product price
		console.log(('\x1b[36m') + "Your total is $" + (res[value.item_id - 1].price) * value.amount);
		// console.log(res[value.item_id - 1].stock_quantity)

		//calls function that asks if the user would like to continue shopping, which resets inquirer prompt
		continueShopping()
			});
		});
	})
}

function continueShopping(){
	inquirer.prompt([{
	  type: "confirm",
	  name: "continue",
	  message: ('\x1b[92m') + "Interested in purchasing more products?" + ('\x1b[0m')
	}]).then(function(value){
	  if(value.continue){
		bAmazon();
	  } else { 
		console.log(('\x1b[92m') + "Thanks for shopping with BAmazon!" + ('\x1b[0m'));
	  }
	});
  }
  
bAmazon();