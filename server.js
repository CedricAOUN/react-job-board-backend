const bodyParser = require('body-parser');
const fileupload = require('express-fileupload')
const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000; // Replace with your desired port number

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: 'password', // Replace with your MySQL password
  database: 'jobbyjob_db' // Replace with your MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define your API routes and database queries here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.use(cors()); // if you want to use every domain

app.use(
  fileupload({
      createParentPath: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.get('/jobs', (req, res) => {
    const sql = 'SELECT * FROM job';
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Failed to fetch jobs from MySQL:', err);
        res.status(500).json({ error: 'Failed to fetch jobs' });
        return;
      }
      res.json(results);
    });
  });

app.post('/myJobs', bodyParser.json(), (req, res) => {
  const sql = `SELECT * FROM job WHERE idemployer='${req.body.userid}'`

  connection.query(sql, (err, results) => {
    if(err) {
      res.status(500).json("Failed to fetch employer jobs from database with error:", req)
    }
    res.status(200).json(results)
      
  })

})

app.post('/auth', bodyParser.json(), (req,res) => {
    const sql = `SELECT * FROM user WHERE email = '${req.body.email}'`

    try 
    {connection.query(sql, (err, results) => {
      const user = results[0];
        if (err) {
          console.error('Failed to fetch user from MySQL:', err);
          res.status(500).json({ error: 'Failed to fetch user' });
          return;
        } 
        
        else if(user == undefined) {
          res.status(500).json({error: "This Email does not exist! Please check your spelling, or sign up!"})
          return;
        } 
        
        else if(user.password == req.body.password) {
            console.log("Logged in!");

            const fileSql = `SELECT * FROM files WHERE user_id = '${user.iduser}'`;

            connection.query(fileSql, (fileErr, fileResults) => {
              if (fileErr) {
                console.error('Failed to fetch file from MySQL:', fileErr);
                res.status(500).json({ error: 'Failed to fetch file' });
                return;
              }

              const userData = {
                username: user.username,
                userType: user.userType,
                userId: user.iduser,
                hasFile: fileResults.length > 0,
                fileName: fileResults.length > 0 ? fileResults[0].file_name : "" // Check if file entry exists
              };

              res.status(200).json(userData);
            });
            return;
        } else {
            console.error('Incorrect Password:', err);
            res.status(500).json({ error: 'Incorrect Password' });
            return;
        }
      });} catch (err) {
        console.log(err);
      }


}
)

app.post('/createUser', bodyParser.json(), (req,res) => {
    const sql = `INSERT INTO user(username, password, email, userType) VALUES ('${req.body.name}', '${req.body.password}', '${req.body.email}', '${req.body.userType}')`

    connection.query(sql, (err, results) => {
        if (err) {
          console.error('Failed to create user into MySQL:', err);
          res.status(500).json({ error: 'Failed to create user' });
          return;
        } else {
          return res.status(200).json("User Submitted")
        }

      });


})

app.post('/deleteUser', bodyParser.json(), (req,res)=> {
  const sql = `DELETE FROM user WHERE email = '${req.body.email}';`

  connection.query(sql, (err, results) => {
    if(err) {
      console.error('Failed to delete user with error:', err);
      res.status(500).json({error: 'Failed to delete user', err});
      return;
    } else {
      return res.status(200).json("User Deleted")
    }
  })
})

app.post('/createJob', bodyParser.json(), (req,res)=> {
  const sql = `INSERT INTO job(idemployer, posted_date, title, company, location, description, requirements, salary) VALUES ('${req.body.iduser}', '${req.body.posted_date}', 
  '${req.body.title}', '${req.body.company}', '${req.body.location}','${req.body.description}', '${req.body.requirements}', '${req.body.salary}')`
  
  
  connection.query(sql, (err, results) => {
    if(err) {
      console.error('Failed to create job with error:', err);
      res.status(500).json({error: 'Failed to create job', err});
      return;
    } else {
      return res.status(200).json("Job Created")
    }
  })
})


app.post('/apply', bodyParser.json(), (req, res) => {
  const sql = `INSERT INTO candidates(user_id, job_id) VALUES ('${req.body.user_id}','${req.body.job_id}')`

  connection.query(sql, (err, result) => {
    if(err) {
      console.error('Failed to add candidate with error:', err);
      res.status(500).json({error: 'Failed to add candidate', err});
      return;
    } else {
      return res.status(200).json("Candidate added!");
    }
  })
})



app.post('/candidates', bodyParser.json(), (req, res)=> {
  const idList = req.body.job_ids;
  const idString = idList.join(',')
  const query = `( ${idString} )`

  const sql =  `SELECT candidates.user_id, candidates.job_id, user.username, user.email
                FROM candidates 
                INNER JOIN user 
                ON candidates.user_id = user.iduser
                WHERE candidates.job_id IN ${query} ;`

  if(idList.length) {
    connection.query(sql, (err, results) => {
      if(err) {
        console.error('Failed to fetch candidates with error:', err);
        return res.status(500).json({error: 'Failed to fetch candidates', err});
      } else {
        return res.status(200).json(results);
      }
    })
  } else {
    res.status(200).json([])
  }

})

app.post("/applications", (req, res) => {
  const sql =   `SELECT * FROM job 
                INNER JOIN candidates 
                ON candidates.job_id = job.idjob
                WHERE user_id = ${req.body.user_id}`

  connection.query(sql, (err, result) => {
    if(result[0] == undefined) {
      res.status(200).json([])
    } else {
      res.status(200).json(result)
    }
  })
})

app.post("/checkCV", (req, res) => {
  const sql = `SELECT * FROM files WHERE user_id='${req.body.user_id}'`

  connection.query(sql, (err, result)=> {
    if(result[0] == undefined) {
      res.status(200).json(false)
    } else {
      res.status(200).json(true)
    }
  })

})






app.post('/upload', (req,res)=> {
  try {
    if (!req.files) {
        res.send({
            status: "failed",
            message: "No file uploaded",
        });
    
    } else {
        let file = req.files.file;

        console.log(req.body.iduser);

        file.mv(`./uploads/${req.body.iduser}.pdf`);
        
        const sqlExistCheck = `SELECT * FROM files WHERE user_id='${req.body.iduser}'`
        const sqlInsert = `INSERT INTO files(user_id, file_name, file_url) VALUES ('${req.body.iduser}', '${file.name}', './uploads/${req.body.iduser}')`
        const sqlReplace = `UPDATE files SET file_name = '${file.name}', file_url = './uploads/${req.body.iduser}' WHERE user_id=${req.body.iduser}`
      
        connection.query(sqlExistCheck, (err, result)=> {
          if(result[0] == undefined) {
            // Doesn't exist, INSERT new entry
            connection.query(sqlInsert, (err, result)=> {
              if(err) {
                res.status(500).json("Error on insert:", err)
              } else {
                res.status(200).json("New file uploaded")
              }
            })
          } else {
            // Already exists, UPDATE instead
            connection.query(sqlReplace, (err, results)=> {
              if(err) {
                res.status(500).json("Error on replace", err)
              } else {
                res.status(200).json("Old entry replaced")
              }
            })
          }
        })

    }
} catch (err) {
    res.status(500).send(err);
}
  
})



