import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppComponent implements OnInit {

  constructor(private login:LoginService,private router:Router){}

  ngOnInit() {
    this.login.validateToken().subscribe((isValid:boolean) => {
          if (isValid) {
              console.log('Token es válido');
          } else {
              console.error('Token es inválido o ha expirado');
              this.router.navigate(['/login']); 
          }
      },
      (error) => {
          console.error('Error al validar el token', error);
          this.router.navigate(['/login']); 
      }
  );
  }
}
