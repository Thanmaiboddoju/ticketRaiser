import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private httpClient: HttpClient) { }

  store_credentials(details:any){
    console.log("Details to be stored are:",details)
    return this.httpClient.post(`http://127.0.0.1:5000/saveuser`, details)
  }

  get_users(){
    return this.httpClient.get(`http://127.0.0.1:5000/getuser`).subscribe((response)=>{
      console.log("Response on submitting",response)
     })
  }

  authenticate_credentials(details:any):any{
    return this.httpClient.post('http://127.0.0.1:5000/authuser',details)
  }
}
