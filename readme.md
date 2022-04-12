
# Roop Kotha Boson

Roop kotha Bosson Its a traditional Indian fashion house, where you can find all kind of women, men and kid’s cloths. Its offering you lots of choices and prices ranges according to your choices. you can see the new arrival and all products in pre order

## Table of content
- [Descriptin](#Descrption)
- [Screenshot](#Roopkotha_boson_Screenshot)
- [Installation Frontend](#Installation_FrontEnd)
- [Database](#For_database)
- [API Integration](#API)
- [How to Run](#Rum)
- [Contributing](#Contributing)
- [Questions](#Questions)
- [License](#License)

## Descrption
```md
WHEN I click on register button
THEN I am diverted to a register page where I have option to register with my email account.
WHEN I register with my email account
THEN an email is sent to me to verify my credentials
WHEN I click the link send throught email
THEN I am diverted to a register conferm page where I have option to put my password and divert to home page.
WHEN I click on login button
THEN I am diverted to a login page where I have option to login and forgor password as well
WHEN I click on forgot password link
THEN an email is sent to me to reset my password and send me to home page
WHEN I sign in as a  user
THEN I am taken to the homepage with an additional option user Dashboard
WHEN I click on shop option in the navbar
THEN I am taken to a new shop page with different sreach option
WHEN I select a price ranges on this page
THEN I am presented with a list of products of that price ranges
WHEN I select categories for search
THEN I am presented with products on that categories
WHEN I select a particular product
THEN I am presented with product detailes and images
WHEN I click on add to wishlist button
THEN I am taken to a user dashboard page with added product to wishlist
WHEN I click on added product to wishlist  in user dashboard page
THEN I am taken to a product detailes page
WHEN I click on login to leave rating button
THEN I am taken to login page
WHEN I click on add to leave rating button
THEN I am taken to a five star rating optin if I am loged in user
WHEN I click on added product to wishlist  in user dashboard page
THEN I am taken to a product detailes page
WHEN I click on add to cart button
THEN I am taken to a side drawer with added product to cart 
WHEN I click on GO to cart button
THEN I am taken to a  product cart pages with added product with payment options
WHEN I click on remove to cart button
THEN That product is taken away from cart
WHEN Cart page have choices optons
THEN I can increase product amount, change color and change size on cart page
WHEN I click on Cart button on top navbar
THEN I am taken to user cart page with added product detailes on cart
WHEN I click on proceed to checkout button 
THEN I am taking to a page with address option and payment amount
WHEN I fill address and click the save button
THEN I place order button is activate and address was saved in database
WHEN I click on place order button 
THEN I am taking to a page with card detailes
WHEN I click on proceed to Pay cash on Delevery button 
THEN I am taking to a page with address option and payment amount
WHEN I fill address and click the save button
THEN I place order button is activate and address was saved in database
WHEN I click on place order button 
THEN I am taking to a user dashboard page with my purchase history
WHEN I click on empty cart button 
THEN Product remove from cart to empty cart
WHEN I sign in as a admin
THEN I am taken to the admin Dashboard with order detailes
THEN I am have option to change changes product order status and save changes options in database
WHEN I click the product page 
THEN I am taken to the add product page with product detailes options
WHEN I click the save button 
THEN I am taken to the all product page with all product saving the product to database
WHEN I click the edit button 
THEN I am taken to the edit product page with product detailes options
WHEN I click the delete button 
THEN The product remove from pages and database
WHEN I click the category button 
THEN I am taken to the add actegory page with category fields and all categories
WHEN I click the category edit button
THEN I am taken to the edit actegory page with edit category fields
WHEN I click the category delete button
THEN The category remove from pages and database
WHEN I click the Sub category button 
THEN I am taken to the add sub actegory page and save subcategory following any category and showing all sub categories
WHEN I click the sub category edit button
THEN I am taken to the edit sub actegory page with edit sub category fields and categories name
WHEN I click the sub category delete button
THEN The sub category remove from pages and database
WHEN I click the Coupon button 
THEN I am taken to the add coupon page and ad all coupons
WHEN I click the Password 
THEN I am taken to the page of change password options

```

##  Roopkotha_boson_Screenshot

[![Screenshot](./images/video_1.gif)]

##  Roopkotha_boson_Screenshot

[![Screenshot](./images/video_2.gif)]

##  Roopkotha_boson_Screenshot
### Log in as user

[![Screenshot](./images/video_3.gif)]

##  Roopkotha_boson_Screenshot
### Checkout

[![Screenshot](./images/video_6.gif)]

##  Roopkotha_boson_Screenshot
### Log in as admin

[![Screenshot](./images/video_4.gif)]

##  Roopkotha_boson_Screenshot
### Log in as admin

[![Screenshot](./images/video_5.gif)]

## Installation_Frontend

```md

### For frontend (client) 
run cd client >>

// For creating REACT APP
npx create-react-app roopkotha

npm  install react-router-dom
npm install redux
npm install react-redux
npm install redux-devtools-extension
use the same package.json and run npm install

//For Design 
npm install antd
npm install @ant-design/icons
npm install react-quill

//For Authentication 
npm install firebase

// For message
npm install react-toastify

//For Header text effect
npm install typewriter-effect

//For Rating
npm install react-star-ratings

//For image 
npm install react-responsive-carousel
npm install react-image-file-resizer
npm install react-modal-image

// For payment 
npm install react-scripts
// For download PDF
npm install @react-pdf/renderer
Import:
For Bootstrap material design : https://mdbootstrap.com/
For ant design : https://ant.design/

```
## For_database
```md
In the command prompt 
run mongoose 
use roopkothaSchema

Also, install Studio 3T
for database, you can import and export data using Studio 3T

```
## API
```md
npm install dotenv
npm install nodemon
npm install firebase-admin
npm install jsonwebtoken
For save images in cloude
npm install cloudinary
npm install uniqueid
npm install slugify
npm install stripe


```
## Run
```md
## On Localhost:
### For client side: npm start
### For server side: npm start

```
## Contributing


=======

## Questions

For any further questions, reachout to me at :

- Github: [rumardas](https://github.com/rumardas)

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

&copy; 2022 Ruma Das

_Licensed under [MIT](./license)_

