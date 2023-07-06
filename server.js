const bodyParser = require('body-parser');
const fileupload = require('express-fileupload')
const express = require('express');
const fs = require('fs');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const app = express();
const port = 3000; // Replace with your desired port number

// Configure MySQL connection
let connection;

// Connect to MySQL

function tryConnect() {
  if(!connection) {
    connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT, // Replace with your MySQL host
      user: process.env.MYSQL_USER, // Replace with your MySQL username
      password: process.env.MYSQL_PASSWORD, // Replace with your MySQL password
      database: process.env.MYSQL_DATABASE,
      connectTimeout: 30000,// Replace with your MySQL database name
    });
  }
  connection.connect((err) => {
    if (err) {
      console.log("\x1b[33m%s\x1b[0m", "Failed to connect to MySQL:", err)
      console.log("Retrying in 30 seconds")
      connection.destroy();
      connection = null;
      setTimeout(()=> {console.log("Retrying..."), tryConnect() }, 30000)
      return
    } else {
      console.log('\x1b[32m%s\x1b[0m','Connected to MySQL');
      return
    }
});}
tryConnect()
// Define your API routes and database queries here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}. Attempting to connect to MySQL(This may take a few minutes).`);
});


app.use(cors()); 

async function verifyToken(req, res, next) {
  const headerString = req.headers['authorization'];

  if (!headerString) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  jwt.verify(headerString.split(" ")[1], process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}


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

app.post('/myJobs', verifyToken, bodyParser.json(), (req, res) => {
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
            const fileSql = `SELECT * FROM files WHERE user_id = '${user.iduser}'`;

            connection.query(fileSql, (fileErr, fileResults) => {
              if (fileErr) {
                console.error('Failed to fetch file from MySQL:', fileErr);
                res.status(500).json({ error: 'Failed to fetch file' });
                return;
              }
              const userToken = jwt.sign({ userId: user.iduser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

              const userData = {
                token: userToken,
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

app.post('/deleteUser', verifyToken, bodyParser.json(), (req,res)=> {
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

app.post('/deleteJob', verifyToken, bodyParser.json(), (req,res)=> {
  const sql = `DELETE FROM job WHERE idjob = '${req.body.jobId}';`

  connection.query(sql, (err, results) => {
    if(err) {
      console.error('Failed to delete job with error:', err);
      res.status(500).json({error: 'Failed to delete job', err});
      return;
    } else {
      return res.status(200).json("Job Deleted")
    }
  })
})




app.post('/createJob', verifyToken, bodyParser.json(), (req,res)=> {
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


app.post('/apply', verifyToken, bodyParser.json(), (req, res) => {
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

app.post("/checkCV",  verifyToken, (req, res) => {
  const sql = `SELECT * FROM files WHERE user_id='${req.body.user_id}'`

  connection.query(sql, (err, result)=> {
    if(result[0] == undefined) {
      res.status(200).json(false)
    } else {
      res.status(200).json(true)
    }
  })

})






app.post('/upload', verifyToken, (req,res)=> {
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



