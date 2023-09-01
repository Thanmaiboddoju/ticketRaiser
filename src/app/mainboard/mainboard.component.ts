import { Component,OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-mainboard',
  templateUrl: './mainboard.component.html',
  styleUrls: ['./mainboard.component.css']
})

export class MainboardComponent implements OnInit{
  create_issue_button : boolean;
  tasksList: any;
  newTask: any;
  newTaskCategory:any
  
  constructor(private TicketsService:TicketsService){
    this.create_issue_button = false
    
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getTicketsList()
  }

  disableCreateIssue(){
    this.create_issue_button = false
    this.newTask=""
  }

  createIssue(){
    this.create_issue_button = true
  }

  addTask(){
    
    this.TicketsService.addTicket({"issue":this.newTask,"category":"dev"}).subscribe((response)=>{
      console.log("added task",response)
      this.getTicketsList()
      this.disableCreateIssue();
     })
    
    
  }

  getTicketsList(){
    
    this.TicketsService.getTicket().subscribe((response)=>{
      this.tasksList=response
     })
  }

  completeTask(id:any){
    console.log(id,"ticket id")
    this.TicketsService.updateTicket(id,"complete").subscribe((response:any)=>{
      // console.log("updated",response)
      if(response.message=="successful"){
        this.getTicketsList()
      }
     })
  }

  deleteTask(id:any){
    this.TicketsService.deleteTicket(id).subscribe((response:any)=>{
      // console.log("updated",response)
      if(response.message=="successful"){
        this.getTicketsList();
      }
     })
  }

  
}
