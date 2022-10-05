import { Deck } from "./deck";
import { UserDeck } from "./user-deck";

export interface Collection
{
	decks: Deck[],
	userDecks: UserDeck[],
}
