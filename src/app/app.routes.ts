import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ValidationComponent } from './components/validation/validation.component';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'agent', component: ValidationComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
