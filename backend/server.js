// Used this as a reference for help with authentication:  https://www.youtube.com/watch?v=TDe7DRYK8vU

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const deckRoute = require( './routes/deck' );
const userDeckRoute = require('./routes/userDeck');
const userRoute = require('./routes/user')
const imageRoute = require( './routes/image' );
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const User = require("./models/user").Model;
const bcrypt = require('bcryptjs')


const app = express();
port = 3081;

// code for authentication put here - eventually can be put into a seperate file

const deckUsers = [];
const uri = "mongodb+srv://ash:finalproject@cluster0.ilz0p.mongodb.net/cardsCollectionApplication?retryWrites=true&w=majority";
// mongoDB connection
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var testConnectionDb = mongoose.connection;
testConnectionDb.on("connected", () => {
  console.log("Connected");
});

const authenticationStorage = new MongoDBSession({
  uri: uri,
  collection: "sessions",
});

app.use(
  session({
    name: "session",
    secret: "qqq",
    resave: false,
    maxAge: 60 * 60 * 1000, // 60 minutes
    saveUninitialized: true,
    store: authenticationStorage

  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static("dist/cardessory"));
app.use(express.json());
app.use( '/api', deckRoute );
app.use('/api', userDeckRoute);
app.use( '/api', userRoute );
app.use( '/api', imageRoute );

// passed into /api/login
const auth = (req, res, next) => { 
  if (req.session.isAuth) {
    next()
  } else {
    // req.redirect('login')
  }
}

// serve frontend application
app.get("/", (req, res) => {
  console.log(req.session.id)
  res.send("App Works!");
});

// listening for port
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});


app.post("/api/login", async (req, res) => {
  // ask db if this is a valid applicationUser based on req.body
  applicationUser = req.body;
  console.log(applicationUser);
  email = applicationUser.email;
  const activeUser = await User.findOne({ email })
  if (!activeUser) {
    console.log("!activeUser")
    res.send({msg: "Login"});
    return;
  } 
  const check = await bcrypt.compare(applicationUser.password, activeUser.password)
  if (!check) {
    console.log("!check")
    res.send({msg: "Login"});
    return;
  }
  req.session.isAuth = true;
  req.session.email = email;
  res.send({msg: "Portal", authenticatedEmail: email});
});

app.delete( '/api/logout', ( req, res ) =>
{
	if( req.session )
	{
		req.session.destroy( err =>
		{
			if( err )
			{
				res.status( 400 ).json( 'Log out failed' );
			}
			else
			{
				res.status( 200 ).json( 'Log out successful' );
			}
		} );
	}
	else
	{
		res.end();
	}
} );
