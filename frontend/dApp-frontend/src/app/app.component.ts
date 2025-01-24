import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,FormsModule,CommonModule,RouterModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck,OnInit {
  title = 'dApp-frontend';
  isloggedin:boolean = false;

  constructor(private router:Router,private sharedService:SharedService,private cdr:ChangeDetectorRef,private http:HttpClient){
    
  }
  ngOnInit(): void {
      this.http.get<any>("/deploy").subscribe((data:any)=>{
          if(data.message === "deployed"){
            console.log("Deployed contracts");
          }
          else{
            console.log("error to deploy contracts");
          }
      });
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
