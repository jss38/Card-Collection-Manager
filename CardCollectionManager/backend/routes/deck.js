const express = require( 'express' );
const Deck = require( '../models/deck' ).Model;
const router = express.Router();


// retrieving a deck from the table
router.get( '/deck/:id', async( req, res ) =>
{
	console.log( 'Retrieving a deck from database...' );
	Deck.findById( req.params.id, ( err, deck ) => responseHandler( err, deck, res, 'retrieving' ) );
} );

// adding a deck to deck table
router.post( "/deck", async( req, res ) => 
{
	console.log( "Posting a new deck to database..." );

	const deckData = req.body;
	const newDeck = Deck( deckData );
	
	// reformat image string
	if( newDeck.image )
		newDeck.image = newDeck.image.split( /[\\/]/ ).pop();
	else
		newDeck.image = 'no_image.png';

	newDeck.save( ( err, deck ) => responseHandler( err, deck, res, 'adding' ) );
} );

// update a deck in the table
router.put( '/deck', async( req, res ) =>
{
	console.log( 'Updating a deck in database...' );

	const id = req.body._id;
	const deck = Deck( req.body );

	// reformat image string
	if( deck.image )
		deck.image = deck.image.split( /[\\/]/ ).pop();
	else
		deck.image = 'no_image.png';

	Deck.findByIdAndUpdate( id, deck, ( err, deck ) => responseHandler( err, deck, res, 'updating' ) );
} );

// delete a deck in the table
router.delete( '/deck/:id', async( req, res ) =>
{
	console.log( 'Deleting a deck from database...' );
	Deck.findByIdAndDelete( req.params.id, ( err, deck ) => responseHandler( err, deck, res, 'deleting' ) );
} );

// handle database api callback and respond to client
const responseHandler = ( error, doc, res, mode ) =>
{
	if( error )
	{
		console.log( error );
		res.status( 500 ).json( `Issue with ${ mode } deck in database` );
	}
	else
	{
		res.status( 200 ).json( doc );
	}
}


module.exports = router;
