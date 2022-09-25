import { UserService } from './../../services/user.service';
import { LoginService } from './../../servises/login.service';
import { Component, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {


    @Output() login:EventEmitter<void> = new EventEmitter;




  constructor(
    
    private readonly loginService:LoginService,
    private readonly userService:UserService
    
    ) { }

  public loginSubmit(loginForm:NgForm):void{
    const {username} = loginForm.value;
   


    this.loginService.login(username)
    .subscribe({
      next:(user:User) => {
        this.userService.user=user;
        this.login.emit();

      },
      error:()=>{

      }
    })
  }


}
