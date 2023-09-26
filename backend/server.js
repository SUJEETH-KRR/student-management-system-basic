const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
} );

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if(err)
            return res.json("Db error");
        else
            return res.json(data);
    })
}) 

app.get("/:id", (req, res) => {
    const sql = "SELECT * FROM student WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err)
            return res.json("error occured");
        else    
            return res.json(data);
    })
})

app.post('/add', (req, res) => {
    // const sql = "INSERT INTO demo (`name`, `rollno`, `cgpa`) VALUES (?)";
    const sql = "INSERT INTO student (`NAME`, `ROLLNO`, `DEPARTMENT`, `CGPA`, `YEAR`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.rollno,
        req.body.dept, 
        req.body.cgpa, 
        req.body.year,
    ];
    db.query(sql, [values], (err, data) => {
        if(err)
            return res.json("Error occured");
        else
            return res.json(data);
    })                                              
})

app.put('/update/:id', (req, res) => {
    const sql = "update student set `NAME` = ?, `ROLLNO` = ?, `DEPARTMENT` = ?, `CGPA` = ?, `YEAR` = ? where id = ?";
    const values = [
        req.body.name,
        req.body.rollno,
        req.body.dept,
        req.body.cgpa,
        req.body.year,
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err)
            return res.json("Error occured");
        else    
            return res.json(data);
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if(err)
            return res.json("Error Occured");
        else
            return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Port is Running");
})