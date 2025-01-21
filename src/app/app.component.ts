import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  styleUrl: './app.component.css',
  template: `
    <router-outlet></router-outlet> 
  `,
  providers:[
    LoginService,
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppComponent implements OnInit {

  constructor(private login:LoginService,private router:Router){}

  ngOnInit() {
    if (!this.login.validateToken()) {
      this.router.navigate(['/login']);
    }
  }
}
