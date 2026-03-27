import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService { 

	login(email: string, password: string): Observable<boolean> {
		console.log(`Enviando credenciales al backend: ${email} - ${password}`);

		const isValid = password == "123456"
		
		return of(isValid).pipe(delay(1000));
	}

}
