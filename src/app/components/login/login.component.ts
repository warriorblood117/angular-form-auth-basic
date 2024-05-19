import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.username, this.password);
    this.authService.login(this.username, this.password).subscribe({
      next: () => {

        // Redirigir al usuario a la página de inicio o a la página protegida
        this.router.navigate(['/home']);
      },
      error: err => {
        // Manejar errores de autenticación
        this.errorMessage = 'Invalid username or password';
      },
      complete: () =>  console.log(this.username, this.password)
    });
  }
}
