const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserDeckSchema = new Schema({
	user_id: { type: mongoose.ObjectId, require: true }, 	// reference to user to avoid large array
	deck: { type: mongoose.ObjectId, require: true }, 		// reference to deck to reduce document size

	email: {type: String},
	sealed: { type: Number }, 			// amount of sealed decks
	opened: { type: Number }, 			// amount of opened decks
	storage: { type: String }, 				// where did you put your deck
	cost: { type: Number }, 				// how much did you buy the deck
	additional_notes: { type: String }, 	// extra info like condition, seal number, etc
	
	// temp test
	//deck: { type: JSON, require: true }
});

var UserDeck = mongoose.model("User_cards", UserDeckSchema);

// exports
module.exports.Schema = UserDeckSchema;
module.exports.Model = UserDeck;
