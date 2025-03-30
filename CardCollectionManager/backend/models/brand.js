// This model doesn't have to be in a separate collection

const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const BrandSchema = new Schema
( {
	name: { type: String },
	website: { type: String },
	instagram: { type: String },
} );

//var BrandModel = mongoose.model( "Brand", BrandSchema );

// exports
module.exports.Schema = BrandSchema;
//module.exports.Model = BrandModel;
