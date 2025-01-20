import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-validation',
  imports: [
    CommonModule,
    NavbarComponent
  ],
  standalone:true,
  templateUrl: './validation.component.html',
})
export class ValidationComponent {

}
