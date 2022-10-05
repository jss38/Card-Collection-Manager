import { Component, OnInit } from '@angular/core';
import {UserSessionService} from 'src/app/service/user-session.service';
import { sampleDecks } from '../../model/sampleDecks';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit 
{
	decks = sampleDecks;
	isLoggedIn = false;

	constructor( private session: UserSessionService ) { }

	ngOnInit(): void 
	{ 
		this.session.getStatus()
			.subscribe( s => this.isLoggedIn = s );
	}
}
