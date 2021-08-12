import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  isEdit: Boolean = false;
  msg: String = '';
  titleAlert = 'This field is required';
  createUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.createUserForm = formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      phone: ['',Validators.required],
      email: ['',Validators.required, Validators.email],
      age : ['', [Validators.min(0), Validators.max(100), Validators.pattern('^[0-9]*')]],
      address: ['']
    });
  }

  ngOnInit() {}

  createUser() {

    const data = {};
    data['name'] = this.createUserForm.value.name;
    data['phone'] = this.createUserForm.value.phone;
    data['email'] = this.createUserForm.value.email;
    data['age'] = this.createUserForm.value.age;
    data['address'] = this.createUserForm.value.address;
    if (this.createUserForm.valid) {
      console.log('This is not a valid form.', 'Alert!');
      return
    }
      this.userService.createUser(data).subscribe((res: any) => {
      this.createUserForm.reset();
      this.router.navigate(['dashboard']);
    });
      console.log('This is a vaild form.', 'Success!');
    }
}
