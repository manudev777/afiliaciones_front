import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lb-error',
  template: `
    <p class="text-danger m-0" *ngIf="isInvalid()" >{{ getErrorMessage() }}</p>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  styles: [
    `
    p {
      font-size: 12px; /* Tamaño de letra 12px */
    }
  `
  ],
})
export class ErrorComponent {
  @Input() control: AbstractControl | null = null;  
  @Input() fieldName: string = '';  

  getErrorMessage(): string {
    if (this.control && this.control.errors) {
      if (this.control.hasError('required')) {
        return `${this.fieldName} es obligatorio.`;
      }
      if (this.control.hasError('minlength')) {
        return `${this.fieldName} debe tener al menos ${this.control.errors['minlength'].requiredLength} caracteres.`;
      }
      if (this.control.hasError('maxlength')) {
        return `${this.fieldName} debe tener como máximo ${this.control.errors['maxlength'].requiredLength} caracteres.`;
      }
      if (this.control.hasError('pattern')) {
        return `El formato de ${this.fieldName} no es válido.`;
      }
      if (this.control.hasError('email')) {
        return `El correo electrónico proporcionado es inválido.`;
      }
      if (this.control.hasError('min')) {
        return `${this.fieldName} debe ser mayor o igual a ${this.control.errors['min'].min}.`;
      }
      if (this.control.hasError('max')) {
        return `${this.fieldName} debe ser menor o igual a ${this.control.errors['max'].max}.`;
      }
    }
    return '';  
  }

  isInvalid() {
    return (this.control?.touched && this.control?.invalid) || (this.control?.dirty && this.control?.invalid);
  }
}
