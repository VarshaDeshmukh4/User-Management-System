import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  user: string;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.user = localStorage.getItem("userName");
  }

  logout() {
    this.authenticationService.logout();
  }
}
