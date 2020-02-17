import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  submitted: boolean;
  loginId: any;
  errorMsg: any;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder, private route: Router, private auth: AuthService
    , private loginServices: HttpService) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,15}')
    ]]
      //  password: ['', [Validators.required]]
    });
  }

  get f() { return this.regForm.controls; }

  onSubmit() {
    this.submitted = true;

    let adminProfile = {
      username: this.regForm.controls['username'].value,
      password: this.regForm.controls['password'].value,

    }



    // this.loginService.login(profile).subscribe ((res) => {

    if (this.regForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.loginServices.post('/admin/register',adminProfile).subscribe((res) => {
      this.isLoading = false;
      console.log("username and password", res)
      this.loginId=res['data']._id;
         
      console.log("results",this.loginId)
      this.auth.sendToken(this.loginId);
      // swal.fire('Congrats...', 'Successfully registered', 'success');
      this.route.navigate(["/login"]);
      alert('SUCCESS!! :-)')
     
    },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log("error responesx", error.error); // body

        this.errorMsg = error.error.message;
        swal.fire('Oops....', this.errorMsg, 'error');

        console.log("error",this.errorMsg)
      });
  }

  register(){
    this.route.navigate(["/login"]);
  }

}
