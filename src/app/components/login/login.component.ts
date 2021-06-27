import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup = new FormGroup({});

  constructor(private cookieService: CookieService, private fb: FormBuilder, private router: Router) { 
    this.loginForm = fb.group({
      username: [this.cookieService.get('username'), [Validators.required]],
      pass:[this.cookieService.get('password'), [Validators.required]]
    })
   }

   submit() {


    if(this.loginForm.valid){
      
      this.loginForm.reset()

      this.router.navigate(['/user']);

    }
  }


   get f(){return this.loginForm.controls;}


  }


