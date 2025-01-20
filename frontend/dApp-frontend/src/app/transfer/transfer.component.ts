import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transactions } from '../models/transactions';

@Component({
  selector: 'app-transfer',
  imports: [RouterModule,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  wallets:string[] = [];
  from_wallet:string="";
  to_wallet:string="";
  _amount:number=0;
  success:boolean=false;
  failure:boolean = false;

  constructor(private sharedService: SharedService,private http:HttpClient){}

  ngOnInit(): void {
    this.wallets = this.sharedService.wallets;
  }
  transfer(){
    this.http.post<any>("http://localhost:3000/transfer",{
          from_wallet:this.from_wallet,
          to_wallet:this.to_wallet,
          amount:this._amount
        })
         .subscribe((data:any)=>{
          if(data.message === "success"){
            this.failure=false;
            this.success =true;
            //calculate balance of that from account
            this.http.post<any>("http://localhost:3000/balance",{wallet_address:this.from_wallet}).subscribe((data) =>{
              if(data.message){
                this.sharedService.ops.push(new Transactions(this.from_wallet,"BURN",this._amount,data.message));
              }
              else{
                console.log("error");
              }
            });

            //calculate the balance of the to account
            this.http.post<any>("http://localhost:3000/balance",{wallet_address:this.to_wallet}).subscribe((data) =>{
              if(data.message){
                this.sharedService.ops.push(new Transactions(this.to_wallet,"MINT",this._amount,data.message));
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
