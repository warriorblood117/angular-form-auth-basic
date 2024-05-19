import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log("esoty en el servicio de autenticacion", username, password)
    const body = {
      username: username,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`http://localhost:8081/auth/login`, body, { headers }).pipe(
      tap(() => {
        localStorage.setItem('loggedIn', 'true');
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
