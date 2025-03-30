import { Component, OnInit, Input } from '@angular/core';
import { Deck } from 'src/app/model/deck';
import { UserSessionService } from 'src/app/service/user-session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-carousel3d',
	templateUrl: './carousel3d.component.html',
	styleUrls: ['./carousel3d.component.scss']
})
export class Carousel3dComponent implements OnInit 
{
	@Input() slides : Deck[] = [];
	activeIndex = 0;

	constructor(private router: Router,private session: UserSessionService) { }

	ngOnInit(): void {
		var isLoggedIn: boolean = this.session.getLoggedInStatus();
		console.log(isLoggedIn)
	}

	jumpToSlide( index : number ) : void
	{
		this.activeIndex = index;
	}

	nextSlide() : void
	{
		if( this.activeIndex < this.slides.length )
		{
			this.activeIndex++;
		}
	}

	prevSlide() : void
	{
		if( this.activeIndex > 0 )
		{
			this.activeIndex--;
		}
	}

	redirection(): void {
		var isLoggedIn: boolean = this.session.getLoggedInStatus();
		console.log(isLoggedIn)
		if(isLoggedIn) {
			this.router.navigateByUrl('/card');
		} else {
			this.router.navigateByUrl('/login');
		}
	}
}
