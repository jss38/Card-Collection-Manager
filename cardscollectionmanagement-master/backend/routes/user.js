const express = require( 'express' );
const User = require("../models/user").Model;
const Deck = require( '../models/deck' ).Model;
const UserDeck = require("../models/userDeck").Model;
const router = express.Router();
const bcrypt = require('bcryptjs')


/********** user api **********/


// this is for adding a user to user collection
router.post( "/user", async( req, res ) => 
{

  const userData = req.body;
  const email = userData.email;
  const activeUser = await User.findOne({ email });
  if(activeUser){
    return res.status( 400 ).send({msg: "Already registered"});
  }
  console.log( "Registering a new user to db..." );
  console.log( userData )

  const hashed = await bcrypt.hash(userData.password, 12);
  userData.password = hashed;
  const newUser = User(userData);
  newUser.save( ( err, user ) => responseHandler( err, user, res, 'adding' ) );

});


// haven't test
// retrieve all user decks for a specific user
router.get( '/user/allDecks', async( req, res ) =>
{
	console.log( 'Retrieving all decks for an user from database' );

	const userEmail = req.session.email;
	const userDecks = await UserDeck.find( { email: userEmail } ).exec();
	const deckIds = userDecks.map( ud => ud.deck );
	const decks = await Deck.find( { _id: { $in: deckIds } } ).exec();

	if( userDecks.length === decks.length )
	{
		res.status( 200 ).json( [ userDecks, decks ] );
	}
	else
	{
		res.status( 500 ).json( 'Issue with retrieving all decks for user' );
	}
} );


// handle database api callback and respond to client
const responseHandler = ( error, doc, res, mode ) =>
{
	if( error )
	{
		console.log( error );
		res.status( 500 ).json( `Issue with ${ mode } user in database` );
	}
	else
	{
		res.status( 200 ).json( doc );
	}
}



module.exports = router;
