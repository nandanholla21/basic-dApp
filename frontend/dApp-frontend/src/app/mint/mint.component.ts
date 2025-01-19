import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Transactions } from '../models/transactions';

@Component({
  selector: 'app-mint',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './mint.component.html',
  styleUrl: './mint.component.css'
})
export class MintComponent implements OnInit {

  wallets:string[]=[];
  success:boolean=false;
  failure:boolean = false;
  selected_wallet:string=""
  mint_amount:number=0;
  constructor(private sharedService:SharedService ){
    
  }

  ngOnInit(){
    this.wallets = this.sharedService.wallets;
    
   
  }
  mint(){

    //api call to nodejs
    this.failure=false;
    this.success = true;
    
    setTimeout(() =>{
      this.success=false;
      
    },3500);
    //calculate balance of that account
    this.sharedService.ops.push(new Transactions(this.selected_wallet,"MINT",this.mint_amount,0));

  }
}
