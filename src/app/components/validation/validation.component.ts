import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-validation',
  imports: [
    CommonModule,
    NavbarComponent,
  ],
  standalone:true,
  templateUrl: './validation.component.html',
  providers:[AuthService]
})
export class ValidationComponent {

}
