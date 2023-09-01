import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient:HttpClient) { }

  addTicket(ticketDetails:any){
    return this.httpClient.post("http://127.0.0.1:5000/addTicket",ticketDetails)
  }

  getTicket(){
    return this.httpClient.get('http://127.0.0.1:5000/getTicket')
  }

  deleteTicket(id: any){
    return this.httpClient.delete(`http://127.0.0.1:5000/deleteTicket/${id}`)
  }

  updateTicket(id: any,status:any){
    return this.httpClient.post(`http://127.0.0.1:5000/updateTicket`,{"id":id,"status":status})
  }
}
