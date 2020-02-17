import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignIn } from '../sign-in';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../service/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMsg: any;
  loginId: any;
  isLoading: boolean;



  constructor(private formBuilder: FormBuilder, private myRoute: Router, private auth: AuthService
    , private loginServices: HttpService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      //   password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,15}')
      // ]]
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    // alert(this.loginForm.controls.username.dirty)
    // if (this.loginForm.controls.username.dirty == true && this.loginForm.controls.password.dirty == true) {
    //   this.loading = true;
    // }
    this.submitted = true;

    let adminProfile = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,

    }



    // this.loginService.login(profile).subscribe ((res) => {

    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.loginServices.post('/admin/login', adminProfile).subscribe((res) => {
      this.isLoading = false;


      console.log("username and password", res)
      this.loginId = res['data']._id;

      console.log("results", this.loginId)
      this.auth.sendToken(this.loginId);

      this.myRoute.navigate(["/dashboard"]);





      // alert('SUCCESS!! :-)')
    },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log("error responesx", error.error); // body

        this.errorMsg = error.error.message;
        swal.fire('Oops....', this.errorMsg, 'error');
        console.log("error", this.errorMsg);

      });

  }
  register() {
    this.myRoute.navigate(["/reg"]);
  }

}
