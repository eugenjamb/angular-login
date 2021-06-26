import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm:FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {

    this.registerForm = fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email:['', [Validators.required, Validators.email]],
      mobNumber:['', [Validators.pattern('[0-9]*')]],
      pass:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      confirmPass:['', [Validators.required]]
    },
    {
      validator: ConfirmedValidator("pass", "confirmPass")
    })
   }

  submit() {
    console.log(this.registerForm.value)

    if(this.registerForm.valid){
      
      alert("New user was signed up")
      this.registerForm.reset()

    }
  }

  get f(){
    return this.registerForm.controls;
  }

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