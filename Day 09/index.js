const express = require('express');
const path = require('path');
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use('/', (req, res) => {
 
    res.render('index', { title: "Express" })
})

app.listen(5000);
