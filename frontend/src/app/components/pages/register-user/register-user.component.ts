import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { User } from 'src/app/shared/models/User';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  userRegisterForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  get userRegisterFormControls() {
    return this.userRegisterForm.controls;
  }

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]]
    },{
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    })
  }

  onRegister( ){
    this.isSubmitted = true;
    if(this.userRegisterForm.invalid) return;
    const userInfo: IUserRegister = {
      name: this.userRegisterFormControls.name.value,
      email: this.userRegisterFormControls.email.value,
      password: this.userRegisterFormControls.password.value,
      address: this.userRegisterFormControls.address.value
    }
    this.userService.registerUser(userInfo).subscribe((newUserInfo: User) => {
      this.userService.userSubject.next(newUserInfo);
      this.userService.setAuthInfo(newUserInfo);
      this.router.navigateByUrl('/');
    })
  }

}
