import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private http = inject(HttpClient)
	private apiUrl = environment.apiUrl;
	private router = inject(Router)

	login(email: string, password: string): Observable<any> {
		return this.http.post(`${this.apiUrl}auth/login`, {
			correo: email,
			contraseña: password
		});
	}

	guardarToken(token: string) {
		localStorage.setItem('token', token);
	}

	obtenerToken() {
		return localStorage.getItem('token');
	}

	cerrarSesion() {
		localStorage.removeItem('token');
		this.router.navigate(["/login"])
	}

	isLogin(): boolean {
		const token = localStorage.getItem('token');
		return !!token;
	}
}
