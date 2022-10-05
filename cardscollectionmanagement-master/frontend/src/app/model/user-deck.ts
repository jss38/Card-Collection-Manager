import { Deck } from 'src/app/model/deck';

export interface UserDeck
{
	_id?: string
	deck?: string,

	email: string

	sealed?: number,
	opened?: number,
	storage?: string,
	cost?: number,
	additional_notes?: string
}
