import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/service/user-session.service';

@Component({
  selector: 'app-guest-nav',
  templateUrl: './guest-nav.component.html',
  styleUrls: ['./guest-nav.component.scss']
})
export class GuestNavComponent implements OnInit {

  constructor(private session: UserSessionService) { }

  ngOnInit(): void {
    //var isLoggedIn: Boolean = this.session.getLoggedInStatus();
    
    //console.log(isLoggedIn)
    
    //var guestDocuments: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("guest");
    //var userDocuments: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("user");
    
    //if(isLoggedIn) {
      //for(let i = 0; i < guestDocuments.length; i++) {
        //console.log(guestDocuments.item(i))
        //guestDocuments.item(i)!.setAttribute("style", "display: none; cursor: pointer;")
      //}
      //for(let i = 0; i < userDocuments.length; i++) {
        //console.log(userDocuments.item(i))
        //userDocuments.item(i)!.setAttribute("style", "display: initial; cursor: pointer;")
      //}
    //}
    //// else do nothing
  }

  logout(): void {
    var guestDocuments: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("guest");
    var userDocuments: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("user");

    for(let i = 0; i < guestDocuments.length; i++) {
      console.log(guestDocuments.item(i))
      guestDocuments.item(i)!.setAttribute("style", "display: inital; cursor: pointer;")
    }

    for(let i = 0; i < userDocuments.length; i++) {
      console.log(userDocuments.item(i))
      userDocuments.item(i)!.setAttribute("style", "display: none; cursor: pointer;")
    }

    this.session.logout()
  }
}
