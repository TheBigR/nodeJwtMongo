# nodeJwtMongo

this repo comes to practice a simple node application
with an authentication simple function, 
that hashes passwords and creates a json web token.

#
also in the repo - the collection of postman requests to demonstrate the api's functionality.


# How to use
PreRequisites
1. mongo db installed and running. (if different port installed, change it in .env file)

In order to use: (windows)
1. clone git repo.
2. run npm install.
3. add to hosts file => {machine local ip address} bank-example.com
4. open cmd in admin mode.
5. in cmd - netsh interface portproxy add v4tov4 listenport=80 listenaddress={machine local ip address} connectport=3000 connectaddress=127.0.0.1
6. nodemon index
* Either run the postman collection to add pre made entries or
7. open a browser to bank-example.com.
8. register - enter any name and any password.
9. signin with credentials.





#Development
* clone git repo.
* run npm install.
* SET NODE_ENV=development
* nodemon index


# whats next?

next part of the repo will contain front end that connects to this api.

