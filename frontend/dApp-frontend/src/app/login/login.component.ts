import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isloggedin?:boolean
  constructor(private router:Router,private location:Location,private sharedService:SharedService){

  }
  ngOnInit() {
    
  }
  login(){
    const navigation = this.location.getState() as {isloggedin:boolean};
    this.isloggedin  = true;
    this.sharedService.change_login_status();

    if(this.sharedService.get_wallets().length === 0){
      this.router.navigate(['/addwallet']);
    }
    else{ 
      this.router.navigate(['/mint']);
    }
  }
}
