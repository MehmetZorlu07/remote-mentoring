# Remote Mentoring API 

This documentation refers to the backend/api of the remote mentoring application. The documentation is written here as the api is on a different repository. 
Click [this](https://github.com/MehmetZorlu07/remote-mentoring-api) to go the the backend repository.

## Server 

The server is able to recieve various requests from the frontend such as: register, signin, and send user info by retrieving the necessary information from the database. 
* The registration request is completed by inserting relevant information from the frontend into the database. A library called bcrypt is used to encrypt the user entered passwords so that they are stored as hash and not plain text. 
* The signin request is completed by comparing the user entered credentials with the information retrieved from the database. 

## Database

PostgreSQL is used as a relational database management system. There are currently 2 main tables in the remote mentoring database to store all the information needed. 
* First one is used for registering users. 
* Second one is used to store the encrypted passwords securely. 
