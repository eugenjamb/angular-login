import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm:FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private cookieService: CookieService, private router: Router) {

    this.registerForm = fb.group({
      username: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      num:['', [Validators.pattern('^[0-9]{10}$')]],
      address:['', [Validators.pattern('')]],
      pass:['', [Validators.required, Validators.pattern("^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]],
      confirmPass:['', [Validators.required]],
      remember: [true]
    },
    {
      validator: ConfirmedValidator("pass", "confirmPass")
    })
   }

  submit() {

    this.cookieService.set('username', this.registerForm.value.username)
    this.cookieService.set('email', this.registerForm.value.email)
    this.cookieService.set('password', this.registerForm.value.pass)
    this.cookieService.set('number', this.registerForm.value.num)
    this.cookieService.set('address', this.registerForm.value.address)


    this.registerForm.reset()

    this.router.navigate(['/']);
    
  }

  get f(){return this.registerForm.controls;}

}


function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}