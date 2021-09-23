const express  = require('express');
const app = express();

// CRUD -> POST, GET, PUT, DELETE

app.get('/', (req, res) => {
    res.send("Hello !!");
})

// app.get('/', (req, res) => {
//     res.json({a : 1});
// })

const auth = (req, res, next ) => {
    if(res.query.admin == 'true'){
        next();
    } else {
        res.status(400).send('Auth Failed');
    }

}

app.use(auth);

app.get('/User', (req, res) => {
    res.send("User entered");
})

app.get("/customer", (req, res) => {
    res.send("customer here!")
})

app.listen(5000)