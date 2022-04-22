/* Populate The Users Table */
INSERT INTO users (username , firstname , lastname , password) VALUES ('Moha' ,'Mohaned', 'Ashraf', '$2b$10$2dTaHEa2QPzJO7gRXKiweuM8/cLapX6cKzQPierKhU7.dj2j4IKp.'); /* pass before hashing: pass123 */
INSERT INTO users (username , firstname , lastname , password) VALUES ('Hass' ,'Hassan', 'Ashraf', '$2b$10$f.k8.AT.U3Zy0pPXjwVGje0W2jy3/VfNUpMDYpw718dpvYXymJKFG'); /* pass before hashing: 123456 */
INSERT INTO users (username , firstname , lastname , password) VALUES ('kate22' ,'Kate', 'Mendes', '$2b$10$9XlShxGKgSG1CvYQIVaJv.2dpqUDuXIKhJtbIFJR.GE.MHU8j4wKG'); /* pass before hashing: 112233 */
INSERT INTO users (username , firstname , lastname , password) VALUES ('Mido' ,'Mohamed', 'Hassan', '$2b$10$Q1xUHTkb.1tP559tmVKU2ur6n4ZSf1b7wxJeLNzNLyStkEIFEcJc6'); /* pass before hashing: abc123 */

/* Populate The Products Table */
INSERT INTO products (name , price) VALUES ('Apple Iphone x' , 400);
INSERT INTO products (name , price) VALUES ('Samsung smart TV' , 700);
INSERT INTO products (name , price) VALUES ('Apple' , 4);
INSERT INTO products (name , price) VALUES ('Laptop' , 500);
INSERT INTO products (name , price) VALUES ('Ps5' , 900);
INSERT INTO products (name , price) VALUES ('Pen' , 1);



/* Populate The Orders Table */
INSERT INTO orders (user_id, status) VALUES (1, 'COMPLETED');
INSERT INTO orders (user_id, status) VALUES (2, 'PROCCESSED');
INSERT INTO orders (user_id, status) VALUES (3, 'STAGING');
INSERT INTO orders (user_id, status) VALUES (4, 'COMPLETED');
INSERT INTO orders (user_id, status) VALUES (1 ,'COMPLETED');
INSERT INTO orders (user_id, status) VALUES (2, 'COMPLETED');

/* Populate The Orders-Products Table */
INSERT INTO orders_products (product_id, order_id , quantity) VALUES (1,1 , 4);
INSERT INTO orders_products (product_id, order_id , quantity) VALUES (1,2 , 6);
INSERT INTO orders_products (product_id, order_id , quantity) VALUES (1,3 , 7);
INSERT INTO orders_products (product_id, order_id , quantity) VALUES (1,4 , 2);

INSERT INTO orders_products (product_id, order_id , quantity) VALUES (2,2 , 1);
INSERT INTO orders_products (product_id, order_id , quantity) VALUES (2,3 , 4);
INSERT INTO orders_products (product_id, order_id , quantity) VALUES (2,5 , 1);

