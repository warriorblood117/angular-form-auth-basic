import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Obtener el nombre de usuario y contraseña del localStorage
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    // Verificar si se encontraron las credenciales en el localStorage
    if (username && password) {
      // Clonar la solicitud original y agregar las credenciales en el encabezado de autorización
      const authReq = req.clone({
        setHeaders: {
          Authorization: 'Basic ' + btoa(`${username}:${password}`)
        }
      });

      // Continuar con la solicitud modificada
      return next.handle(authReq);
    } else {
      // Si no se encontraron las credenciales, continuar con la solicitud original sin modificar
      return next.handle(req);
    }
  }
}
