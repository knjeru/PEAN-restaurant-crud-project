DROP DATABASE IF EXISTS g19_restaurantsdb;
CREATE DATABASE g19_restaurantsdb;

\c g19_restaurantsdb;

CREATE TABLE restaurants(
    id serial PRIMARY KEY,
    name varchar,
    cuisine varchar,
    image varchar,
    city varchar,
    state varchar,
    rating integer,
    description text
);

CREATE TABLE reviews (
    id serial PRIMARY KEY,
    customerName varchar,
    creationDate date DEFAULT NOW(),
    review text,
    restaurant_id integer REFERENCES restaurants(id)
);

-- SEED DATA

-- Seed restaurants

INSERT INTO restaurants (name, cuisine, image, city, state, description, rating) VALUES
('Los Tacos', 'Mexican', '../images/mexican.png', 'Denver', 'Co',
'Busy & easygoing outpost for Mexican comfort food such as carnitas 
paired with potent margaritas. Known for Mexican meals with a side of 
spicy green chili.', 5),
('Burger Bar', 'American', '../images/burger.png', 'Seattle', 'WA',
'Coming Soon', 3),
('Pasta Freddy''s', 'Italian', '../images/italian.png', 'Sacramento', 'CA',
'Coming Soon', 2),
('Bangkok Grill', 'Thai', '../images/thai.jpg', 'Brooklyn', 'NY',
'Coming Soon', 4),
('Pho Mazing', 'Vietnamese', '../images/pho.jpg', 'Denver', 'Co',
'Coming Soon', 5),
('Fiestaritos', 'Mexican', '../images/mexican.png', 'Lincoln', 'NE',
'Coming Soon', 5);

-- Seed reviews

INSERT INTO reviews (customerName, review, restaurant_id)
VALUES
('Margaret', 'Thank you, Hank, for coming over to our table to ensure our 
enjoyment and for sharing pictures of your grandkids.', 2),
('Anne', 'I love the decor, there are bunch of cute small 
tables and stools for you to enjoy your ice cream in the shop. 
They offer cookies, coffee, tea, biscotti as well as other treats. ', 1),
('Tom', 'Thank you, Hank, for coming over to our table to ensure our 
enjoyment and for sharing pictures of your grandkids.', 3),
('Jeremy', 'I thought I was not going to love this place after it 
changed ownership. But the be honest our two times visiting have 
been wonderful!', 6),
('Ophelia', 'First time in there excellent flavors we had 
black sesame seasalt caramel taro and Cinnabon I actually 
uploaded pictures and Yelp sent me an email telling me that 
the pictures were not from this business when in 
fact they clearly are ... And I checked in as proof I''m confused', 5),
('Anthony', 'Thank you, Hank, for coming over to our table to ensure our 
enjoyment and for sharing pictures of your grandkids.', 1),
('Dwayne', 'Thank you, Hank, for coming over to our table to ensure our 
enjoyment and for sharing pictures of your grandkids.', 5),
('Lankston', 'Soho Japanese Restaurant 4.5 star rating 1022 
reviews The twin dragon roll was perfect topped with 
deep fried amphibians', 4),
('Arthur', 'Thank you, Hank, for coming over to our table to ensure our 
enjoyment and for sharing pictures of your grandkids.', 2),
('Penelope', 'Let''s face it, things went downhill faster than 
Eddie the Eagle when Desyree left; I think there is no disputing that.  
Two visits here while under new owner/manager-ship...the quality is off', 1),
('Antoinette', 'So stellar. The girls and I will be back soon!', 3);


