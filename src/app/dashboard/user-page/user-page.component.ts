import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"],
})
export class UserPageComponent implements OnInit {
  userId;
  isReadonly: boolean;
  userData: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.userService.getUserDetails(this.userId).subscribe((res) => {
      console.log(res);
      this.userData = res;
    });
  }
  onEdit() {
    this.router.navigate(["/dashboard/update/", this.userId]);
  }
}
