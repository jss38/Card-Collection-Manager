import { Component, OnInit, Input } from '@angular/core';
import { Location } from "@angular/common";
import { Deck } from '../../model/deck';
import {UserDeck} from 'src/app/model/user-deck';

@Component({
	selector: 'app-deck',
	templateUrl: './deck.component.html',
	styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
	
	deck: Deck =
	{
		brand: {name: '', _id: '62e997e7b5983f140d5a20b9'},
		date_of_issue: undefined,
		edition: "",
		finish: "",
		image: "fontaine_blue.png",
		isPublic: false,
		manufacturer: "",
		name: "Blue Fontaine",
		print_run: 0,
		product_description: "",
		retail_price: 0,
		stock: "",
		_id: "62e997e7b5983f140d5a20b8",
	}

	userDeck: UserDeck =
	{
		additional_notes: "",
		cost: 0,
		deck: "62e997e7b5983f140d5a20b8",
		email: "ross@abc.com",
		opened: 0,
		sealed: 0,
		storage: "",
		_id: "62e997e7b5983f140d5a20b7",
	}

	constructor( 
		private location: Location 
	) { }

	ngOnInit(): void {
	}

	goBack(): void {
		this.location.back();
	}

}
