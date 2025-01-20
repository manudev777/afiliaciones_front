import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private sessionUserKey = 'user'; 

    constructor(){}

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
}