var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazonDB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runSearch();
})

var runSearch = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale", 
            "View Low Inventory", 
            "Add to Inventory", 
            "Add New Product" 
        ]
    }).then(function(answer) {
    	// console.log(answer.action);
        switch(answer.action) {
            case 'View Products for Sale':
            	console.log('products for sale');
                // artistSearch();
            break;

            case 'View Low Inventory':
                // multiSearch();
            break;

            case 'Add to Inventory':
                // rangeSearch();
            break;

            case 'Add New Product':
                // songSearch();
            break;
        }
    })
}
