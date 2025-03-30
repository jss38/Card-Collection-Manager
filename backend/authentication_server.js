const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
port = 3000;

// used in class example to help code this

const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const mongoUri = "mongodb+srv://ash:finalproject@cluster0.ilz0p.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "cardsCollectionApplication",
    }
  )
  .then(console.log("Connected in authentication"));

const storage = new MongoDBSession({
  uri: mongoUri,
  collection: "Users",
});

app.use(
  session({
    name: "session",
    secret: "qqq",
    resave: false,
    maxAge: 60 * 60 * 1000, // 60 minutes
    saveUninitialized: true,
    store: storage

  })
);
app.get("/", (req, res) => { 
  console.log(req.session.id)
});
app.get("/api/session", (req, res) => {
  // ask db if this is a valid applicationUser based on req.body
  applicationUser = req.body;
  // currently implemented as such that all users are valid

  if (applicationUser) {
    // valid login
    req.session.usr = applicationUser;
    console.log("Authenticated!");
    res.send(`<a href="/session2"> NEXT PAGE </a>`);
  } else {
    // invalid - redirect them to login again
    // currently all logins are valid atm
    // eventually plan to only implement logins that are not found in the users database
    console.log("Error in login")
  }
});
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

