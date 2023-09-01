import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../services/credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  signup_credentials: any;
  

  constructor(private save_credentials:CredentialsService,private router:Router){
    this.signup_credentials = new FormGroup({
      userName:new FormControl('',Validators.required),
      gmail:new FormControl('',[Validators.required,Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]),
      password: new FormControl('',Validators.required),
      
    })

    
    
  }

  signup_submit(){
    // console.log(this.signup_credentials)
    this.save_credentials.store_credentials(this.signup_credentials.value).subscribe((response:any)=>{
      console.log("Response on submitting",response)
      if(response.message=="error"){
        alert(response.errormsg)
      }
      else{
        this.router.navigate(['/dashboard'])
      }
     })
  }

  get_users(){
    console.log(this.save_credentials.get_users())
  }
  
}
