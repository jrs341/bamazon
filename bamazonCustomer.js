var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazonDB"
})

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
})

var promptCustomer = function() {
	prompt.start();
  // Get two properties from the user: productID and quantity 
  prompt.get(['productID', 'quantity'], function (err, result) { 
    // Log the results. 
    console.log('Command-line input received:');
    console.log('  product ID: ' + result.productID);
    console.log('  quantity: ' + result.quantity);
  });
}
var displayProducts = function() {
	connection.query('SELECT * FROM products', function(err, res) {
	    if (err) throw err;
	    console.log(res); 
	    promptCustomer();   
	});
}

displayProducts();

// prompt.start();
 
//   // 
//   // Get two properties from the user: username and email 
//   // 
//   prompt.get(['productID', 'quantity'], function (err, result) {
//     // 
//     // Log the results. 
//     // 
//     console.log('Command-line input received:');
//     console.log('  product ID: ' + result.productID);
//     console.log('  quantity: ' + result.quantity);
//   });

