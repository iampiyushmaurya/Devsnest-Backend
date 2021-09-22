const express = require('express');
const app=express();

// const slash = (req,res)=>{
//     res.send("Hello");
// };
// app.get('/',slash);
// app.post('/',slash);
// app.put('/',slash);
// app.delete('/',slash);
app.get('/',(req,res)=>{
    res.json({a:"Hello"});
});

 app.listen(5000);