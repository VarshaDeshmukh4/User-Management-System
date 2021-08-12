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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.updateUserForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      phone: [""],
      email: ["", Validators.email],
      age: [],
      address: [],
    });
  }
  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    const userRole = localStorage.getItem("userRole");
    if (userRole === "user") {
      this.isReadonly = false;
    } else if (userRole === "Admin") {
      this.isReadonly = true;
    }
    this.userService.getUserDetails(this.id).subscribe((response) => {
      this.updateUserForm.controls.id.setValue(response.id);
      this.updateUserForm.controls.name.setValue(response.name);
      this.updateUserForm.controls.phone.setValue(response.phone);
      this.updateUserForm.controls.email.setValue(response.email);
      this.updateUserForm.controls.age.setValue(response.age);
      this.updateUserForm.controls.address.setValue(response.address);
    });
  }

  updateUser() {
    if (window.confirm("Are you sure you want to update?")) {
      this.userService
        .getUserUpdate(this.id, this.updateUserForm.value)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(["dashboard"]);
        });
    }
  }
}
