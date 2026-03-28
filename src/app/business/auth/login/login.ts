import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { Alerts } from '../../../shared/services/alerts';

@Component({
   selector: 'app-login',
   imports: [ReactiveFormsModule],
   templateUrl: './login.html',
   styleUrl: './login.css',
})

export class Login {
   private authService = inject(AuthService);
   private alertsService = inject(Alerts)
   private router = inject(Router);

   loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
   });

   onLogin() {
      if (this.loginForm.valid) {
         const email = this.loginForm.get('email')?.value ?? '';
         const password = this.loginForm.get('password')?.value ?? '';
         
         this.authService.login(email, password).subscribe({
            next: (e) => {
               this.authService.guardarToken(e.token)
               this.router.navigate(["/users"])
            },
            error: (e) => {
               this.alertsService.mostrarError(e.error.mensaje)
            }
         })
      }
   }
}
