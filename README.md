# react-job-board-backend
Back-end of my react-job-board project, designed to work with: [react-job-board-ui](https://github.com/CedricAOUN/react-job-board-ui)

## Install guide: 

Download this repository and extract it.

### Database Setup
- Select a MySQL Database management system of your choosing. *(eg: [MySql Workbench](https://www.mysql.com/products/workbench/))*
- Create a new "Connection" in your DB Management System. For minimal code modification, here is the relevant information from the code:
  ```
  const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password', 
    database: 'jobbyjob_db' 
  });
  ```
- If you setup your connection with different information, you maybe modify this part of the code in "server.js".
- Import "MockDatabase.sql" provided in this repository, into the DB management system.

If all was done correctly, you should now have a connection point in your Database management system with a "jobbyjob_db" table, and a bunch of data.

### Starting up the server
- Make sure you have Node installed. (Open terminal/CMD and type Node -v). If not, please install it via: [NodeJS](https://nodejs.org/en/download)
- Open Terminal/CMD in the folder where you extracted this repository. (.../react-job-board-backend)
- Type "npm install" and please wait for the packages to finish installing.
- Type "node server.js".

Your server should now be up and running with the following:
```
  Server is running on port (YOUR SETUP PORT)
  Connected to MySQL
```

You may now head to [react-job-board-ui](https://github.com/CedricAOUN/react-job-board-ui), and follow the instructions there to setup the UI.
