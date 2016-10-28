-- CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `departmentId` VARCHAR(45) NOT NULL,
  `productName` VARCHAR(45) NULL,
  `price` DECIMAL(10,2) NULL,
  `inStockQuantity` INT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('tools','hammer', '15.50', '10');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('tools','saw', '35.60', '5');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('tools','tape measure', '9.95', '12');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('tools','drill', '68.90', '3');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('tools','screw driver', '3.10', '22');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('electrical', 'conduit', '12.75', '8');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('electrical', 'volt meter', '18.95', '6');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('electrical', 'plyers', '6.45', '8');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('electrical', 'plug', '3.25', '7');
INSERT INTO `products` (`departmentId`, `productName`, `price`, `inStockQuantity`) VALUES ('electrical', 'breaker', '5.10', '1');

-- ### Alternative way to insert more than one row
-- INSERT INTO `products` (`flavor`, `price`, `quantity`) 
-- VALUES ('vanilla', '2.50', '100'), ('chocolate', '3.10', '120'), ('strawberry', '3.25', '75');


CREATE TABLE `departments` (
  `departmentId` VARCHAR(45) NOT NULL,
  `departmentName` VARCHAR(45) NULL,
  `overHead` DECIMAL(10,2) NULL,
  `totalSales` DECIMAL(10,2) NULL,
  PRIMARY KEY (`departmentId`)
);