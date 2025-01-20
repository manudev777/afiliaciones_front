import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ValidationComponent } from './components/validation/validation.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'agent', component: ValidationComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
