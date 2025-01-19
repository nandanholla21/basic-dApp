import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Transactions } from '../models/transactions';

@Component({
  selector: 'app-tx-history',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './tx-history.component.html',
  styleUrl: './tx-history.component.css'
})
export class TxHistoryComponent implements OnInit{

  tx_history:Transactions[] = [];
  constructor(private sharedService:SharedService){

  }
  ngOnInit(): void {
      this.tx_history = this.sharedService.ops;
  }
}
