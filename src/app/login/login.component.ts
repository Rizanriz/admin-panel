import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = ""
  password:string = ""

  constructor(private router:Router,data:DataService){}

  login(){
    if (this.email && this.password) {
      this.router.navigateByUrl("Home")
    }else{
      alert( `please enter the details`)
    }
  }

}
