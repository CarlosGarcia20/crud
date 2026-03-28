import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class Alerts {
	mostrarExito(mensaje: string) {
		Swal.fire({
			title: mensaje,
			icon: "success",
			theme: "dark",
			position: 'top-right',
			showConfirmButton: false,
			timerProgressBar: false,
			timer: 3000
		})
	}

	mostrarError(mensaje: string) {
		Swal.fire({
			title: mensaje,
			icon: "error",
			theme: 'dark',
			position: "top-right",
			showConfirmButton: false,
			timerProgressBar: false,
			timer: 3000
		})
	}
}
