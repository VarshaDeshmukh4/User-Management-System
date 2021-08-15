import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"],
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  customer: any;
  id: any;
  isReadonly: boolean;
  userRole: string;
  userId: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateUserForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      phone: [""],
      role: [""],
      email: ["", Validators.email],
      age: [],
      address: [],
      password: ["", Validators.required],
    });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.userRole = localStorage.getItem("userRole");
    this.userId = this.route.snapshot.params.id;
    if (this.userRole === "User") {
      this.isReadonly = false;
    } else if (this.userRole === "Admin") {
      this.isReadonly = true;
    }
    this.userService.getUserDetails(this.id).subscribe((response) => {
      this.updateUserForm.controls.id.setValue(response.id);
      this.updateUserForm.controls.name.setValue(response.name);
      this.updateUserForm.controls.phone.setValue(response.phone);
      this.updateUserForm.controls.email.setValue(response.email);
      this.updateUserForm.controls.age.setValue(response.age);
      this.updateUserForm.controls.address.setValue(response.address);
      this.updateUserForm.controls.role.setValue(response.role);
      this.updateUserForm.controls.password.setValue(response.password);
    });
  }

  updateUser() {
    if (window.confirm("Are you sure you want to update?")) {
      this.userService
        .getUserUpdate(this.id, this.updateUserForm.value)
        .subscribe((res) => {
          const userRole = localStorage.getItem("userRole");
          if (userRole === "User") {
            this.router.navigate(["dashboard/userpage/", this.userId]);
          } else if (userRole === "Admin") {
            this.router.navigate(["dashboard"]);
          }
        });
    }
  }

  cancel() {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "User") {
      this.router.navigate(["dashboard/userpage/", this.userId]);
    } else if (userRole === "Admin") {
      this.router.navigate(["dashboard"]);
    }
  }
}
