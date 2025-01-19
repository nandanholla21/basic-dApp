import { ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck {
  title = 'dApp-frontend';
  isloggedin:boolean = false;

  constructor(private router:Router,private sharedService:SharedService,private cdr:ChangeDetectorRef){
    
  }
  ngDoCheck(){
    if(this.isloggedin != this.sharedService.isloggedin){
      this.isloggedin = this.sharedService.isloggedin;
      this.cdr.detectChanges();
    }
  }
  login() {
    this.router.navigateByUrl('/login',{state:{isloggedin:this.isloggedin}});
  }
  logout(){
    this.sharedService.change_login_status();
    this.isloggedin=false;
    this.router.navigateByUrl("/");
  }

}
