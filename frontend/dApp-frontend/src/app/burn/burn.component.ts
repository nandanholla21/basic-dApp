import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Transactions } from '../models/transactions';

@Component({
  selector: 'app-burn',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './burn.component.html',
  styleUrl: './burn.component.css'
})
export class BurnComponent {
  wallets:string[]=[];
    success:boolean=false;
    failure:boolean = false;
    burn_amount:number=0;
    selected_wallet:string=""
    constructor(private sharedService:SharedService ){
      
    }
  
    ngOnInit(){
      this.wallets = this.sharedService.wallets;
    }

    burn(){
      //api call to nodejs

    this.failure=false;
    this.success = true;
    
    setTimeout(() =>{
      this.success=false;
      
    },3500);
    this.sharedService.ops.push(new Transactions(this.selected_wallet,"BURN",this.burn_amount,0));
    }
}
