# sploot-backend

# NodeJS RESTful APIs with MongoDB

This repository contains code for a NodeJS RESTful API service using ExpressJS framework and MongoDB database. The APIs allow users to signup, login, create articles, retrieve articles and update their own user profile.

# Prerequisites

Before running the application, you should have the following installed:

Node.js (v14+)
MongoDB (v4+)
Getting Started
To get started, clone the repository and install the dependencies:

bash
Copy code
git clone <repository_url>
cd <repository_name>
npm install
Next, create a .env file in the root directory and add the following environment variables:

makefile
Copy code
MONGODB_URI=<mongodb_connection_uri>
JWT_SECRET=<jwt_secret_key>
Replace <mongodb_connection_uri> with the connection URI for your MongoDB database and <jwt_secret_key> with a secret key for JWT authentication.

# To start the application, run the following command:

nodemon

# End Points

Endpoint : api/signup

Endpoint: api/login

Endpoint: api/users/:userId/articles

Endpoint: api/articles

Endpoint: api/users/:userId

# Standard response format of the APIs

{
statusCode:

data:{

data: //response data

},

error: //if any exists

message:
}
