Introduction
=============
-> Make nodejs-ecommerce-folder
-> Inside that make these folders => (app, config, controllers, middlewares, model, routes, utils, server.js)
-> Initialise npm => npm init --yes
-> npm i express mongoose

Server Setup
=============
-> Add type as module to use import/export in package.json
-> Make app-app.js file
	- Create the express app instance and export it
	- Inside server create http server
	- Setup scripts for nodemon (You can install it as dev dependency)

User Authentication
====================

1. User Model Creation
-----------------------------------------------------------------
-> Make User Schema using mongoose under models directory
	UserSchema includes
		- fullname (String, required)
		- email (String, required)
		- password (String, required)
		- orders (Array of objects, Refers to Order Model)
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Order"
			}
		- wishlists (Array of objects, Refers to Wishlist Model)
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Wishlist"
			}
		- isAdmin (Boolean, default: false)
		- hasShippingAddress (Boolean, default: false)
		- shippingAddress: {
			firstname, lastname, address, city, postalCode, province, country, phone
		}
	- Also have timestamp
-> Connect to mongoDB 
	- Write connection logic in dbConnect.js under "config" folder
	- Print the connection HOST, i.e. connected?.connection?.host
	- If error happens then print error message and process.exit(1)
	- import in app.js and call the function
	- install dotenv and store mongo url their (use dotenv.config() in app.js to access the values everywhere)
	- Install mongoDB for VScode to see data inside VScode

2. User Registration Controller
--------------------------------------------------------------------------------------
-> Make user.controller.js
-> Make the router setup
	- register
		- Check if user exists
		- Hash password
		- Create User
	- login
		- Check if user exists
		- Compare password
-> POSTMAN setup workspace

3. Error Handling
-----------------------------------------------------------------------------------------
-> npm i express-async-handler
-> Make globalErrorHandler.js inside middlewares
	- Takes 4 parameters (req, res, err, next)
	- Define stack = err.stack, message = err.message
	- Return json response both stack and message
	- Use this middleware after all routes
	- Use express-async-handler inside controllers
	- Add status code to the globalMiddleware code

4. Not-Found Route Handler
-------------------------------------------------------------------------------------------
-> Crate 404 handler by making another middleware under globalErrorHandler
-> Inside the "notFound" middleware function create new error saying req.originalUrl not found
-> call next to globalErrorHandler 