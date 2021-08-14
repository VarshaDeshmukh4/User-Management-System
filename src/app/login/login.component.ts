import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userDetails;
  loginForm: FormGroup;
  titleAlert = "This field is required";
  submitted = false;
  returnUrl: string;
  userId: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/";
  }

  onSubmit() {
    this.userId = this.route.snapshot.params.id;
    this.submitted = true;
    const data = {};
    data["email"] = this.loginForm.value.email;
    data["password"] = this.loginForm.value.password;
    if (this.loginForm.valid) {
      this.authenticationService.login().subscribe(
        (response) => {
          this.userDetails = response;
          this.userDetails.filter((users) => {
            if (
              users.email === this.f.email.value &&
              users.password === this.f.password.value
            ) {
              this.authenticationService.setUserRole(users.role);
              this.authenticationService.setUserName(users.name);
              if (users.role === "Admin") {
                this.router.navigate(["dashboard"]);
              } else if (users.role === "User") {
                this.router.navigate(["dashboard/userpage/", users.id]);
              }
            }
          });
        },
        (error) => {}
      );
    }
  }
}
