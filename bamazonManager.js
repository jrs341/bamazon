var mysql = require('mysql');
var inquirer = require('inquirer');
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
    promptManager();
})

// displays a list of all the products for sale
// =====================================================================================================
var displayProducts = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {  
        console.log(' productID: ' + res[i].id + ' Description: ' + res[i].productName + ' Price: ' + res[i].price + ' Qty in Stock: ' + res[i].inStockQuantity);
        }
        promptManager();
    }); 
}

// displays a list of all the products with a current inventory less than or equal to three
// =====================================================================================================
var viewLowInv = function() {
    connection.query('SELECT * FROM products WHERE inStockQuantity<=3', function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {  
        console.log(' productID: ' + res[i].id + ' Description: ' + res[i].productName + ' Price: ' + res[i].price + ' Qty in Stock: ' + res[i].inStockQuantity);
        }
        promptManager();
    });
}

// allows the manager to add update inventory quantity
// =====================================================================================================
var addToInv = function(requestID, requestQuantity) {
    connection.query('SELECT * FROM products WHERE id=?', [requestID], function(err, res){
        if (err) throw err; 
        connection.query("UPDATE products SET inStockQuantity=inStockQuantity+" + requestQuantity + ' WHERE id="' + requestID + '"', function(err, res) {
                console.log('In stock update complete');
            });
        promptManager();
    });  
}

// allows the manager to add new products to the database
// =====================================================================================================
var addNewProduct = function(department, Name, pricePer, Quantity) {
    connection.query("INSERT INTO products (departmentId, productName, price, inStockQuantity) VALUES ('" + department + "','" + Name + "','" + pricePer + "','" + Quantity + "');", function(err, res){
        if (err) throw err;
        console.log("Item added to Bamazon!");
    });
    promptManager();
}
    
var promptManager = function() {
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
                displayProducts();
            break;
            case 'View Low Inventory':
                console.log('products with low inventory');
                viewLowInv();
            break;
            case 'Add to Inventory':
                prompt.get(['productID', 'quantity'], function (err, result) { 
                // Log the results. 
                console.log('Command-line input received:');
                console.log('  product ID: ' + result.productID);
                console.log('  quantity: ' + result.quantity);
                addToInv(result.productID, result.quantity)
            });
            break;
            case 'Add New Product':
               prompt.get(['Department_ID', 'Product_Name', 'Price', 'In_Stock_Quantity'], function(err, result){
                console.log('Command-line input received:');
                console.log('  Department ID: ' + result.Department_ID);
                console.log('  Product Name: ' + result.Product_Name);
                console.log('  Price: ' + result.Price);
                console.log('  In_Stock_Quantity: ' + result.In_Stock_Quantity);
                addNewProduct(result.Department_ID, result.Product_Name, result.Price, result.In_Stock_Quantity)
               });
            break;
        }
    });
}
