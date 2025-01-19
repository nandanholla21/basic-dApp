import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Transactions } from '../models/transactions';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-mint',
  imports: [FormsModule,RouterModule,CommonModule,HttpClientModule],
  templateUrl: './mint.component.html',
  styleUrl: './mint.component.css'
})
export class MintComponent implements OnInit {

  wallets:string[]=[];
  success:boolean=false;
  failure:boolean = false;
  selected_wallet:string=""
  mint_amount:number=0;
  constructor(private sharedService:SharedService ,private http:HttpClient){
    
  }

  ngOnInit(){
    this.wallets = this.sharedService.wallets;
    
   
  }
  mint(){

    // api call to nodejs
    this.http.post<any>("http://localhost:3000/mint",{
      wallet_address:this.selected_wallet,
      amount:this.mint_amount
    })
     .subscribe((data:any)=>{
      if(data.message === "success"){
        this.failure=false;
        this.success =true;
        //calculate balance of that account
        this.http.post<any>("http://localhost:3000/balance",{wallet_address:this.selected_wallet}).subscribe((data) =>{
          if(data.message){
            this.sharedService.ops.push(new Transactions(this.selected_wallet,"MINT",this.mint_amount,data.message));
          }
          else{
            console.log("error");
          }
        });

      }
      else{
        this.failure=true;
        this.success = false;
      }
    });
    
    setTimeout(() =>{
      this.success=false;
      this.failure=false;
      
    },3500);

  }
}
