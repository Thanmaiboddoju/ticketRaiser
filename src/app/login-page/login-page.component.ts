import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CredentialsService } from '../services/credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  logincredentials:any;
 
  constructor(private CredentialsServiceobj:CredentialsService,private router:Router){
    this.logincredentials = new FormGroup({
      gmail : new FormControl(),
      password: new FormControl()
    })
  }

  login_button(){
    // console.log("login credentials",this.logincredentials)
    this.CredentialsServiceobj.authenticate_credentials(this.logincredentials.value).subscribe((response: any)=> {
      // console.log("Response on login",(response))
      if(response.message == "successful"){
        // console.log("working")
        this.router.navigate(['/dashboard'])
      }
      else{
        console.log("error",response.errormsg)
        alert("wrong credentials")
        this.router.navigate(['signup'])
      }
    })
  }
}
