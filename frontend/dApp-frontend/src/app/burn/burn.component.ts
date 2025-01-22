import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Transactions } from '../models/transactions';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-burn',
  imports: [FormsModule,CommonModule,RouterModule,HttpClientModule],
  templateUrl: './burn.component.html',
  styleUrl: './burn.component.css'
})
export class BurnComponent {
  wallets:string[]=[];
    success:boolean=false;
    failure:boolean = false;
    burn_amount:number=0;
    selected_wallet:string=""
    constructor(private sharedService:SharedService ,private http:HttpClient){
      
    }
  
    ngOnInit(){
      this.wallets = this.sharedService.wallets;
    }

    burn(){
      //api call to nodejs
      this.http.post<any>("http://backend-app:3000/burn",{
        wallet_address:this.selected_wallet,
        amount:this.burn_amount
      })
     .subscribe((data:any)=>{
      if(data.message === "success"){
        this.failure=false;
        this.success =true;
        //calculate balance of that account

        this.http.post<any>("http://backend-app:3000/balance",{wallet_address:this.selected_wallet}).subscribe((data:any) =>{
          if(data.message){
            this.sharedService.ops.push(new Transactions(this.selected_wallet,"BURN",this.burn_amount,data.message));
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
