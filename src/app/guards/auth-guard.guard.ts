import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          // Si el usuario no está autenticado, redirige a la página de inicio de sesión
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
