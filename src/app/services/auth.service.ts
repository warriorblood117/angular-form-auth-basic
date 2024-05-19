import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Verificar si hay una sesión iniciada al cargar el servicio
    this.checkSession();
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`http://localhost:8081/auth/login`, body, { headers }).pipe(
      tap(() => {
        // Almacenar la información de autenticación en el localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    // Eliminar la información de autenticación del localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private checkSession(): void {
    // Verificar si hay una sesión iniciada al cargar el servicio
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.loggedIn.next(isLoggedIn);
  }
}
