import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { User } from "../model/user";
import { environment } from "../../environment/environment";
import { Response } from "../model/response";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private sessionUserKey = 'user'; 
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){}

    login(user: { username: string; token: string }): void {
        localStorage.setItem(this.sessionUserKey, JSON.stringify(user));
    }
    
    logout(): void {
        localStorage.removeItem(this.sessionUserKey);
    }
    
    isLoggedIn(): boolean {
        const user = localStorage.getItem(this.sessionUserKey);
        return !!user; 
    }
    
    getUser(): { username: string; token: string } | null {
        const user = localStorage.getItem(this.sessionUserKey);
        return user ? JSON.parse(user) : null;
    }

    validateUser(form:User){
        return this.http.post<Response<any>>(`${this.apiUrl}/auth/login`, form).pipe(
                tap((response) => {
                  this.login(response.data);
        }));
    }
        
    validateToken(): Observable<boolean> {
        const user = this.getUser();
        if (!user || !user.token) {
            return new Observable<boolean>(observer => observer.next(false)); 
        }
    
        return this.http.post<boolean>(`${this.apiUrl}/auth/validate-token`, { token: user.token }).pipe(
            map((response: boolean) => {
                return response; 
            }),
            catchError((error: any) => {
                console.error(error)
                this.logout(); 
                return of(false);
            })
        );
    }
}