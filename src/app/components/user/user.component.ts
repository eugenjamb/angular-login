import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent{

  data:any
  username:any
  email:any
  number:any
  address:any

  constructor(private cookieService: CookieService) {

    this.data = this.cookieService.getAll();

    this.username = this.data.username
    this.email = this.data.email
    this.number = this.data.number
    this.address = this.data.address

   }



}
