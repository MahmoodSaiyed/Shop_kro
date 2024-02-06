create database shop_kro;
use shop_kro;
-- user table
create table user(
user_id int primary key auto_increment,
user_name text,
email varchar(200) unique ,
mobile_number varchar(100) unique ,
password varchar(200) unique
);
truncate table user;
alter table user auto_increment=1;

-- {user_name,email,mobile_number}
select * from user;
-- category table
create table category(
category_id int primary key auto_increment,
category_name text,
category_image text ,
category_description text
);


select * from category;
truncate table category;
alter table category auto_increment=1;
-- {category_name,category_image,category_description}

-- product table
create table product(
product_id int primary key auto_increment,
product_name text,
product_image text ,
product_description text,
product_price int,
discount int ,
discount_type text,

category_id int

);
select * from product;

truncate table product;
alter table product auto_increment=1;
-- {product_name,product_image,product_description,product_price,discount,discount_type,quantity,category_id}

-- cart table
create table cart(
cart_id int primary key auto_increment,
user_id int,
product_id int,
quantity int 
);
-- {user_id,product_id}
truncate table cart;
alter table cart auto_increment=1;
select * from cart;
drop table cart;

-- connection with category and product
select p.*,c.category_name from product as p
inner join category as c on p.category_id=c.category_id;


-- Cart connection with user and product
select * from cart as c
inner join user as u on c.user_id = u.user_id
inner join product as p on c.product_id=p.product_id;

-- Address
create table address(
id int primary key auto_increment,
user_id int not null,
country varchar(100) not null,
full_name varchar(100) not null,
street_number varchar(100) not null,
city varchar(100) not null,
state varchar(100) not null,
pincode varchar(100) not null,
mobile_number varchar(100) not null
);
select * from address;
-- {"user_id","country","full_name","street_number","city","state","pincode","mobile_number"}




-- Query


