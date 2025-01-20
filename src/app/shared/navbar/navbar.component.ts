import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "lb-navbar",
    template: `
        <nav class="navbar sticky-top bg-body-tertiary" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">{{title}}</a>

                <div *ngIf="this.isLoggedIn" class="ms-auto">
                    <button class="btn btn-secondary" (click)="logout()">Cerrar Sesión</button>
                </div>
            </div>
        </nav>
    `,
    standalone: true,
    imports: [
        CommonModule,
   ]
})
export class NavbarComponent implements OnInit{
    @Input() title: string = "PPINAUD";
    isLoggedIn !: boolean;

    constructor(private auth:AuthService,private router:Router) {}

    ngOnInit(){
        this.isLoggedIn = this.auth.isLoggedIn();
    }

    logout(){
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}