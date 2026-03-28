import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router)

	if(authService.isLogin()) {
		return true;
	} else {
		Swal.fire({
			theme: 'dark',
			icon: 'warning',
			title: 'Acceso Denegado',
			text: 'Necesitas iniciar sesión para ver esta página',
			confirmButtonColor: '#2563EB'
		})
	}

	router.navigate(['/login']);
	return false;

};
