import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { environment } from 'src/environments/environment';
import { UserSessionService } from "src/app/service/user-session.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private location: Location, private session: UserSessionService) {}
  
  ngOnInit(): void {
  }

  navigateToRegister(): void {
    this.router.navigateByUrl("/register");
  }

  login(): void {

    var password: string = (<HTMLInputElement>document.getElementById("password"))
      .value;
    var email: string = (<HTMLInputElement>document.getElementById("email"))
      .value;

    var user: any = {email: email, password: password };

	this.session.login( user );
  }

  goBack(): void {
    this.location.back();
  }
}
