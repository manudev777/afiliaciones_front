import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../model/register';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root', 
})
export class RegisterService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerAgent(form:Register): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/register`, form);
  }

  getEmailDomains(): string[] {
    return ['gmail.com', 'hotmail.com', 'outlook.com','Otros'];
  }
}
