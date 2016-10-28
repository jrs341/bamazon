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
    checkQuantity(result.productID, result.quantity);
  });
}

var checkQuantity = function(requestID, requestQuantity) {
	// console.log(requestID);
	connection.query('SELECT * FROM products WHERE id=?',[requestID], function(err, res) {
		if (err) throw err;
		console.log(res[0].inStockQuantity);
		if (requestQuantity > res[0].inStockQuantity) {
			console.log('We only have ' + res[0].inStockQuantity + ' available');
		} else {
			console.log('Place Order');
		}
		// for (var i = 0; i < res.length; i++) {
		// 	console.log('  In Stock ' + res[i].inStockQuantity);
		// }
		// console.log('  Quanity result ' + res.id);
	})
	
}

var displayProducts = function() {
	connection.query('SELECT * FROM products', function(err, res) {
	    if (err) throw err;
	    console.log(res); 
	    promptCustomer(); 
	    // checkQuantity();  
	});
	
}

displayProducts();

// connection.query('SELECT inStockQuantity FROM products WHERE id=9', function(err, res) {
// 		if (err) throw err;
// 		console.log(res.length);
// 		for (var i = 0; i < res.length; i++) {
// 			console.log(res[i].inStockQuantity);
// 		}
// 		// console.log('  Quanity result ' + res);
// 	})



