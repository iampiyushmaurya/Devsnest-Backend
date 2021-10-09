const express = require("express");
const User = require("./model");

const app = express();

app.get("/", (req, res) => {
  res.send("Pg is working");
});

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      fullName: "Neo Anderson",
      email: "neo@gmail.com",
      password: "neo@neo12",
    });
    const savedUser = await newUser.save();
    console.log("User saved!");
    res.status(201).send(savedUser);
  } catch (error) {
    console.error("Error in saving user", error);
  }
};

app.get("/create", createUser);

app.listen(5000, (err) => {
  if (err) {
    console.error("Error in pg connection establishment", err);
  }
  console.log("Connection at port 5000 established");
});
