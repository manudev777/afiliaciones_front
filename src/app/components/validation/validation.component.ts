import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validation',
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule
  ],
  standalone:true,
  templateUrl: './validation.component.html',
  providers:[]
})
export class ValidationComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        tipoPersona: ['natural', Validators.required],
        ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], 
        razonSocial: [''],
        direccionComercial: [false],
        tipoVia: ['calle', Validators.required],
        nombreVia: ['', Validators.required],
        regimen: ['rg', Validators.required],
      });
    }

    onSubmit(): void {
      if (this.form.valid) {
        console.log('Formulario enviado:', this.form.value);
      } else {
        console.log('Formulario inválido.');
      }
    }
}
