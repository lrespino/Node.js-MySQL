DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price  DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("a", "aa", 1.1, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("b", "bb", 2.2, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("c", "cc", 3.3, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("D", "DD", 3.3, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("E", "EE", 3.3, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("F", "FF", 3.3, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("G", "GG", 3.3, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("H", "HH", 3.3, 4);