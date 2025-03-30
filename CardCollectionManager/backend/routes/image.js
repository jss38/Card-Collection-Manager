const express = require( 'express' );
const multer = require("multer");
const path = require( 'path' );
const Deck = require( '../models/deck' ).Model;
const router = express.Router();

const IMAGE_DIR = './images';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_DIR)
  },
  filename: (req, file, cb) => {
    console.log(file);
    // Store the file as the current date and the name of the files together
    // To ensure that each image name is unique
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

router.use( '/images', express.static( path.join( __dirname, '../', IMAGE_DIR ) ) );

// fetch an image from disk
router.get( '/image/:id', async( req, res ) =>
{
	console.log( 'Retrieving a deck image from disk...' );
	const deck = await Deck.findById( req.params.id ).exec();
	
	if( deck.image )
	{
		const filename = deck.image.split( /[\\/]/ ).pop();
		res.sendFile( path.join( __dirname, '../', IMAGE_DIR, filename ) );
	}
	else
	{
		res.sendFile( path.join( __dirname, '../', IMAGE_DIR, 'no_image.png' ) );
	}
} );

// save an image into disk
router.post("/addImage", upload.single("deck-img"), (req, res) => {
  res.status(204);
  res.end();
});


module.exports = router;
