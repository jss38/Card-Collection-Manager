import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Deck } from "src/app/model/deck";
import { UserDeck } from "src/app/model/user-deck";
import { Brand } from "src/app/model/brand";
import { environment } from "src/environments/environment";
import { StorageApiService } from "src/app/service/storage-api.service";
import { UserSessionService } from "src/app/service/user-session.service";

@Component({
	selector: "app-card",
	templateUrl: "./card.component.html",
	styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
	url = environment.serverAPI;

	editable: boolean = false;
	deckId: string | null = null;
	deck: Deck | undefined = undefined;
	userDeck: UserDeck | undefined = undefined;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private storage: StorageApiService,
		private session: UserSessionService
	) {}

	ngOnInit(): void {
		console.log(this.session.getEmail())

		this.route.paramMap
			.subscribe( params =>
			{
				this.deckId = params.get( 'deckId' );
				if( !this.deckId )
				{
					this.editable = true;
					return;
				}

				this.session.getCollection()
					.subscribe( c => 
					{
						this.deck = c.decks.find( d => d._id == this.deckId );
						this.userDeck = c.userDecks.find( ud => ud.deck == this.deckId );
						
						if( this.deck && this.userDeck )
							this.setAllInputs();
					} );
			} );
	}

	goBack(): void {
		this.location.back();
	}

	previewImage(event: any): void {
		console.log(event.target.files[0]);
		(<HTMLImageElement>document.getElementById('img-preview')).src = URL.createObjectURL(event.target.files[0]);
	}

	setAllInputs(): void
	{
		this.editable = false;
		const inputs = document.getElementsByTagName( 'input' );
		const textareas = document.getElementsByTagName( 'textarea' );

		// manage all inputs
		for( let item of [ ...inputs, ...textareas ] )
		{
			item.disabled = true;

			const attr: string = item.id.replace( '-', '_' );
			if( attr as keyof Deck in this.deck! )
			{
				item.value = this.deck![ attr as keyof Deck ]!.toString();
			}
			else if( attr as keyof UserDeck in this.userDeck! )
			{
				item.value = this.userDeck![ attr as keyof UserDeck ]!.toString();
			}
		}

		// manage special inputs
		const specials = [];
		specials.push( document.getElementById( 'retail-price' ) as HTMLInputElement );
		specials.push( document.getElementById( 'print-run' ) as HTMLInputElement );
		specials.forEach( s => s.value = s.value == '0' ? '' : s.value );

		const brand = document.getElementById( 'brand' ) as HTMLInputElement;
		brand.value = this.deck!.brand.name;

		const total = document.getElementById( 'total' ) as HTMLInputElement;
		if( this.userDeck!.sealed && this.userDeck!.opened )
			total.value = ( this.userDeck!.sealed  + this.userDeck!.opened ).toString();
		else
			total.value = '0';
	}

	editAttributes(): void
	{
		const inputs = document.getElementsByTagName( 'input' );
		const textareas = document.getElementsByTagName( 'textarea' );

		// manage all inputs
		for( let item of [ ...inputs, ...textareas ] )
		{
			item.disabled = false;
		}
		this.editable = true;
	}

	saveInventory(): void {
		var deck_notes: string = (<HTMLTextAreaElement>(
			document.getElementById("notes")
		)).value;
		var deck_total: string = (<HTMLInputElement>(
			document.getElementById("total")
		)).value;
		var deck_sealed: string = (<HTMLInputElement>(
			document.getElementById("sealed")
		)).value;
		var deck_opened: string = (<HTMLInputElement>(
			document.getElementById("opened")
		)).value;

		var deck_title: string = (<HTMLInputElement>(
			document.getElementById("name")
		)).value;
		var deck_edition: string = (<HTMLInputElement>(
			document.getElementById("edition")
		)).value;
		var deck_style: string = (<HTMLInputElement>(
			document.getElementById("style")
		)).value;
		var deck_brand: string = (<HTMLInputElement>(
			document.getElementById("brand")
		)).value;
		var deck_product_description: string = (<HTMLInputElement>(
			document.getElementById("product-description")
		)).value;

		var deck_storage: string = (<HTMLInputElement>(
			document.getElementById("storage")
		)).value;
		var deck_cost: string = (<HTMLInputElement>(
			document.getElementById("cost")
		)).value;

		var deck_date_of_issue: string = (<HTMLInputElement>(
			document.getElementById("date-of-issue")
		)).value;
		var deck_stock: string = (<HTMLInputElement>(
			document.getElementById("stock")
		)).value;
		var deck_finish: string = (<HTMLInputElement>(
			document.getElementById("finish")
		)).value;
		var deck_retail_price: string = (<HTMLInputElement>(
			document.getElementById("retail-price")
		)).value;
		var deck_print_run: string = (<HTMLInputElement>(
			document.getElementById("print-run")
		)).value;
		var deck_manufacturer: string = (<HTMLInputElement>(
			document.getElementById("manufacturer")
		)).value;

		var img: HTMLInputElement = <HTMLInputElement>document.getElementById('deck-img');
		var pathName: string = img.value;;

		var deck_brand_object: Brand = {
			name: deck_brand,
		};

		var deck_object: Deck = {
			isPublic: false,
			name: deck_title,
			edition: deck_edition,
			image: pathName,
			brand: deck_brand_object,
			date_of_issue: new Date( deck_date_of_issue ),
			stock: deck_stock,
			finish: deck_finish,
			print_run: Number( deck_print_run ),
			retail_price: Number( deck_retail_price ),
			manufacturer: deck_manufacturer,
			product_description: deck_product_description,
		};

		var user_deck: UserDeck = {
			email: this.session.getEmail(),
			sealed: Number( deck_sealed ),
			opened: Number( deck_opened ),
			storage: deck_storage,
			cost: Number( deck_cost ),
			additional_notes: deck_notes,
		};


		if( this.deck && this.userDeck )
		{
			if( deck_object != this.deck )
			{
				deck_object._id = this.deck._id;
				this.storage.updateDeck( deck_object )
					.subscribe();
			}
			if( user_deck != this.userDeck )
			{
				user_deck._id = this.userDeck._id;
				user_deck.deck = this.userDeck.deck;
				this.storage.updateUserDeck( user_deck )
					.subscribe();
			}
			this.router.navigateByUrl( 'portal' );
		}
		else
		{
			this.storage.addUserDeck( user_deck, deck_object )
				.subscribe( {
					next: data => 
					{
						console.log( 'successfully added user deck' );
						this.router.navigateByUrl( 'portal' );
					},
					error: err => console.error( err.error ),
			} );
		}
	}

	deleteDeck(): void
	{
		this.storage.deleteUserDeck( this.userDeck!._id! )
			.subscribe( {
				next: data => 
				{
					console.log( 'successfully deleted user deck' );
					this.router.navigateByUrl( 'portal' );
				},
				error: err => console.error( err.error ),
			} );
	}
}
