import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-addwallet',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './addwallet.component.html',
  styleUrl: './addwallet.component.css'
})
export class AddwalletComponent {

  wallet_address:string=""

  constructor(private sharedService:SharedService,private router:Router){

  }

  added_wallet(){
    this.sharedService.add_wallet(this.wallet_address);
    
    this.router.navigateByUrl("/mint");
  }

}
