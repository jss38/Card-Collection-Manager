import { Brand } from 'src/app/model/brand';
import { Deck } from 'src/app/model/deck';

const fontaine : Brand =
{
	_id: '0',
	name: 'Fontaine',
	website: 'http://www.fontainecards.com',
};

export const sampleDecks : Deck[] = 
[
	{
		_id: '0',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Blue',
		image: 'assets/sample_decks/fontaine_blue.png',
		brand: fontaine,
	},
	{
		_id: '1',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Black',
		image: 'assets/sample_decks/fontaine_black.png', 
		brand: fontaine,
	},
	{
		_id: '2',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Pink',
		image: 'assets/sample_decks/fontaine_pink.png',
		brand: fontaine,
	},
	{
		_id: '3',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Green',
		image: 'assets/sample_decks/fontaine_green.png', 
		brand: fontaine,
	},
	{
		_id: '4',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Slight',
		image: 'assets/sample_decks/fontaine_slight.png', 
		brand: fontaine,
	},
	{
		_id: '5',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Carrot V1',
		image: 'assets/sample_decks/fontaine_carrot_v1.png',
		brand: fontaine,
	},
	{
		_id: '6',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Chinatown',
		image: 'assets/sample_decks/fontaine_chinatown.png',
		brand: fontaine,
	},
	{
		_id: '7',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Wine',
		image: 'assets/sample_decks/fontaine_wine.png',
		brand: fontaine,
	},
	{
		_id: '8',
		isPublic: false, 
		name: 'Fontaine Playing Cards', 
		edition: 'Guess V1',
		image: 'assets/sample_decks/fontaine_guess_v1.png',
		brand: fontaine,
	},
];
