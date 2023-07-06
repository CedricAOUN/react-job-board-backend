# react-job-board-backend
Back-end of my react-job-board project, designed to work with: [react-job-board-ui](https://github.com/CedricAOUN/react-job-board-ui)

## Install guide: 
Because this is a showcase project, there isn't many secure MySQL hosting solutions for this project.

For that reason, it is more reliable to host your own instance, locally:

Download this repository and extract it.

### Database Setup
- Select a MySQL Database management system of your choosing. *(eg: [MySql Workbench](https://www.mysql.com/products/workbench/))*
- Create a new "Connection" in your DB Management System. For minimal code modification, here are the credentials you can use:
  ```
  const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password', 
    database: 'jobbyjob_db' 
  });
  ```
- Otherwise, modify "server.js" with the relevant connection information from your DB management system.
- Import the "MockDatabase.sql" provided in this repository, into the your DB management system.
- Select "jobbyjob_db" as your active table. 


### Starting up the server
- Make sure you have Node installed. (Open terminal/CMD and type "Node -v"). If not, please install it via: [NodeJS](https://nodejs.org/en/download)
- Open Terminal/CMD in the folder where you extracted this repository. (.../react-job-board-backend)
- Execute the following commands:

```npm install```

After they have finished installing, start the server:
  
```node server.js```

Your server should now be up and running with the following:
```
  Server is running on port (YOUR SETUP PORT)
  Connected to MySQL
```

You may now enjoy the full capabilities of my [React Job Board Application](https://react-job-board-ui.vercel.app/)
