import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl= '';

  constructor(private fb: FormBuilder, private userService: UserService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    const userLogin =  {
      email: this.loginFormControls.email.value,
      password: this.loginFormControls.password.value
    }
    this.userService.login(userLogin).subscribe((userResponse: User) => {
      this.userService.userSubject.next(userResponse);
      this.userService.setAuthInfo(userResponse);
      this.router.navigateByUrl(this.returnUrl);
    },
    (error: any) => {

    })
  }

}
