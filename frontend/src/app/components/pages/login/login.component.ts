import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    console.log("Creds", this.loginForm.controls)
  }

}
