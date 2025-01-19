import { Injectable } from '@angular/core';
import { Transactions } from '../models/transactions';

@Injectable({
  
  providedIn: 'root'
})
export class SharedService {

  isloggedin:boolean=false;
  wallets:string[] = [];

  ops:Transactions[] = [];

  constructor() {
    

  }
  public change_login_status(){
    this.isloggedin = !this.isloggedin;
  }
  public get_wallets() : string[]{
    
    return this.wallets;
  }
  public add_wallet(address:string) {
    this.wallets.push(address);
  }
}
