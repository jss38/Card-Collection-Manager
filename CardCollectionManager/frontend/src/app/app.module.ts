import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './page/login/login.component';
import { ExploreComponent } from './page/explore/explore.component';
import { CardComponent } from './page/card/card.component';
import { GuestNavComponent } from './component/guest-nav/guest-nav.component';
import { Carousel3dComponent } from './component/carousel3d/carousel3d.component'; 

import * as Hammer from 'hammerjs';
import { RegisterComponent } from './page/register/register.component';
import { PortalComponent } from './page/portal/portal.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CollectionComponent } from './component/collection/collection.component';
import { DeckComponent } from './page/deck/deck.component';

// hammer config
@Injectable() 
export class HammerConfig extends HammerGestureConfig
{
	override overrides =
	{
		swipe: { direction: Hammer.DIRECTION_ALL },
	};
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExploreComponent,
    CardComponent,
    GuestNavComponent,
    Carousel3dComponent,
    RegisterComponent,
    PortalComponent,
    NavbarComponent,
    CollectionComponent,
    DeckComponent,
  ],
  imports: [
    BrowserModule,
	  HammerModule,
	  HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers:[
	  {
		  provide: HAMMER_GESTURE_CONFIG,
		  useClass: HammerConfig,
	  },
	  CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
