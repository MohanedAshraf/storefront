# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    - route: /api/products  [GET]   
- Show
    - route: /api/products/:id  [GET] 
- Create [token required]
    - route: /api/products  [POST] 


#### Users
- Index [token required]
    - route: /api/users  [GET]  
- Show [token required]
    - route: /api/users/:id  [GET]  
- Create [token required]
    - route: /api/users  [POST]  
- Authenticate
    - route: /api/users/auth  [POST]  

#### Orders
- Current Order by user [token required]
    - route: /api/users/orders  [GET]


## Data Shapes
#### Product
-  id
- name
- price

Table Schema: 

|id|name|price|
|--|----|------|
|SERIAL PRIMARY KEY|VARCHAR(50) NOT NULL|NUMERIC NOT NULL|VARCHAR(64)|

``CREATE TABLE products(
id SERIAL PRIMARY KEY, 
name VARCHAR(50) NOT NULL, 
price NUMERIC NOT NULL);``

#### User
- id
- firstName
- lastName
- password

Table Schema:

|id|username (UNIQUE)|firstname|lastname|password|
|--|----|------|-------|------|
|SERIAL PRIMARY KEY|VARCHAR(50) NOT NULL|VARCHAR(50) NOT NULL|VARCHAR(50) NOT NULL|TEXT|

``CREATE TABLE users(
id SERIAL PRIMARY KEY, 
username VARCHAR(50) NOT NULL, 
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
password TEXT, 
UNIQUE(username));``

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


Tables Schemas:

We will need one table to define many to many relationship of orders/products and one for orders.

Orders Table: 
|id|user_id|status|
|--|----|------|
SERIAL PRIMARY KEY|bigint REFERENCES users(id)|VARCHAR(20) NOT NULL|

``CREATE TABLE orders(
id SERIAL PRIMARY KEY, 
user_id bigint REFERENCES users(id), 
status VARCHAR(20) NOT NULL);``

orders/products Table: 
|id|product_id|quantity|order_id|
|--|----------|-------|------|
|SERIAL PRIMARY KEY|bigint REFERENCES products(id)|integer|bigint REFERENCES orders(id)|

``CREATE TABLE orders_products(
id SERIAL PRIMARY KEY, 
product_id bigint REFERENCES products(id), 
quantity integer,
order_id bigint REFERENCES orders(id));``
