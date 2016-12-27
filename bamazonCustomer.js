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

var totalCost = 0;
// =====================================================================================================
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

// checks the current inventory against the customers request and removes the customers quantity from the database quantity
// =====================================================================================================
var checkQuantity = function(requestID, requestQuantity) {
	// console.log(requestID);
	connection.query('SELECT * FROM products WHERE id=?',[requestID], function(err, res) {
		if (err) throw err;
		console.log(res[0].price);
		if (requestQuantity > res[0].inStockQuantity) {
			console.log('We only have ' + res[0].inStockQuantity + ' available');
			promptCustomer();
		} else {
			// console.log('Place Order');
			connection.query("UPDATE products SET ? WHERE ?", [{
    		inStockQuantity: (res[0].inStockQuantity - requestQuantity)
			}, {
    		id: requestID
			}], function(err, res) {
				// console.log('In stock update complete');
			});
			var subTotal = (res[0].price * requestQuantity);
			totalCost = subTotal + totalCost;
		
			prompt.start();
			console.log('enter \'y\' to order more items or \'n\' to checkout');
			prompt.get(['Order_More_Items'], function(err, result){
				if (err) throw err;
				if (result.Order_More_Items == 'y') {
					promptCustomer();
				} else {
					console.log('Total cost is ' + totalCost);
				}
			})
		}
	})	
}

// displays a list of all the products for sale
// =====================================================================================================
var displayProducts = function() {
	connection.query('SELECT * FROM products', function(err, res) {
	    if (err) throw err;
	    for (var i = 0; i < res.length; i++) {	
	    console.log(' productID: ' + res[i].id + ' Description: ' + res[i].productName + ' Price: ' + res[i].price + ' Qty in Stock: ' + res[i].inStockQuantity);
		}
	    promptCustomer(); 
	});	
}

displayProducts();




