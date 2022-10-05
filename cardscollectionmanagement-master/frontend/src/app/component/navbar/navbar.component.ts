import { Component, OnInit } from '@angular/core';
import {UserSessionService} from 'src/app/service/user-session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private session: UserSessionService ) { }

  ngOnInit(): void {
  }

  logout(): void
  {
	  this.session.logout()
  }
}
