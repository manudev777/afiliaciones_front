import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { User } from "../model/user";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { Response } from "../model/response";

@Injectable({
    providedIn:'root'
})
export class LoginService{
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private auth:AuthService){}

    validateUser(form:User){
        return this.http.post<Response<any>>(`${this.apiUrl}/auth/login`, form).pipe(
            tap((response) => {
              this.auth.login(response.data);
        }));
    }
    
    validateToken(): Observable<boolean> {
        const user = this.auth.getUser();
        if (!user || !user.token) {
            return new Observable<boolean>(observer => observer.next(false)); 
        }

        return this.http.post<boolean>(`${this.apiUrl}/auth/validate-token`, { token: user.token }).pipe(
            map((response: boolean) => {
                return response; 
            }),
            catchError((error: any) => {
                this.auth.logout(); 
                return of(false);
            })
        );
    }
    
}