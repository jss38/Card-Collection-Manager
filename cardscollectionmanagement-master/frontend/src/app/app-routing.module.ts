import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './page/explore/explore.component';
import { LoginComponent } from './page/login/login.component';
import { CardComponent } from './page/card/card.component';
import { RegisterComponent } from './page/register/register.component';
import { PortalComponent } from './page/portal/portal.component';
import {DeckComponent} from './page/deck/deck.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = 
[
	{ path: '', component: ExploreComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent},
  	{ path: 'card', component: CardComponent, canActivate: [ AuthGuard ] },
  	{ path: 'card/:deckId', component: CardComponent, canActivate: [ AuthGuard ] },
	{ path: 'portal', component: PortalComponent, canActivate: [ AuthGuard ] },
	{ path: 'deck', component: DeckComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
