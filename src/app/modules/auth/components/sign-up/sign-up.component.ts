import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  formSubmitted = false;
  public newUser! : User;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
     

    });
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.signupForm.valid) {
      // Perform the signup logic here
      console.log(this.signupForm.value);
    }
  }

  signUp() {
    const url = 'http://127.0.0.1:9090/user/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      name: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      age: 0,
      address: '',
      phoneNumber: '',
      role: "user"
    };

    if (this.signupForm.valid) {
      this.http.post<User>(url, body, { headers }).subscribe(
        response => {
          this.newUser = response; // Assign the API response to newUser variable
          console.log("Here's the new user:", JSON.stringify(this.newUser, null, 2));
          //this.router.navigate(['/verificationCode', this.newUser._id]); 
          const url = "/verificationCode/"+this.newUser._id
    this.router.navigateByUrl(url)
          // Navigate to verification code page with user ID
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
