import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { ErrorComponent } from "../../shared/error/error.component";
import Swal from 'sweetalert2';
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NavbarComponent,
        ErrorComponent,
        HttpClientModule,
        ReactiveFormsModule
    ],
    standalone:true,
    providers:[LoginService]
})
export class LoginComponent implements OnInit{

    formLogin!:FormGroup;
    title:string = 'Ingresa tu solicitud';

    constructor(
        private loginService:LoginService,
        private router: Router
    ){
        this.formLogin = new FormGroup({
            username : new FormControl("",[Validators.required]),
            password : new FormControl("",[Validators.required])
        });
    }

    ngOnInit(): void {}

    singIn(){
        if(this.formLogin.valid){
            Swal.fire({
                title: 'Procesando...',
                text: 'Por favor espere',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading(); 
                },
            });    

            this.loginService.validateUser(this.formLogin.value).subscribe({
                next: (data) => {
                    Swal.close(); 
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'La operación se realizó correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });  
                },
                error: (error:any) => {
                    Swal.close(); 
                    console.error(error);
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Ocurrió un problema al realizar la operación',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                },
                complete: () => this.router.navigate(['/agent'])

            });
        }else{
            Swal.fire({
                title: '!Formulario inválido!',
                text: 'Revise los datos del formulario antes de continuar',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
        }
    }
}