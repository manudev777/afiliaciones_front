import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: './app.component.css',
  template: `
    <router-outlet></router-outlet> 
  `,
  providers:[
    AuthService,
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router){}

  ngOnInit() {
    if (!this.auth.validateToken()) {
      this.router.navigate(['/login']);
    }
  }
}
