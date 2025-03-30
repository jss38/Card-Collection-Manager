import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { StorageApiService } from "src/app/service/storage-api.service";
import { User } from "src/app/model/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private storage: StorageApiService,

  ) {}

  ngOnInit(): void {}

  navigateToLogin(): void {
    this.router.navigateByUrl("/login");
  }

  goBack(): void {
    this.location.back();
  }
  register(): void {
    var name: string = (<HTMLInputElement>document.getElementById("name"))
      .value;
    var email: string = (<HTMLInputElement>document.getElementById("email"))
      .value;
    var password: string = (<HTMLInputElement>document.getElementById("pwd"))
      .value;

    var user: User = { name: name, email: email, password: password };

    this.storage.addUser( user )
		.subscribe( {
			next: data => {
        console.log('user is registered succesfully')
        this.router.navigateByUrl("/login");
      },
      error: err => console.error(err.error),
    });
  }
}
