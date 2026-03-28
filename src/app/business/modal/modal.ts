import { Component, output, input, effect } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-modal',
	imports: [ReactiveFormsModule],
	templateUrl: './modal.html',
	styleUrl: './modal.css',
})
export class Modal {
	cerrarModal = output<void>();
	usuarioGuardado = output<any>();
	usuarioAEditar = input<any>(null);

	usuarioForm = new FormGroup({
		nombre: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		rol: new FormControl('Usuario', [Validators.required])
	});


	constructor() {
		effect(() => {
			const usuario = this.usuarioAEditar();
			if (usuario) {
				this.usuarioForm.patchValue(usuario);
			} else {
				this.usuarioForm.reset({ rol: 'Usuario' });
			}
		});
	}

	guardar() {
		if (this.usuarioForm.valid) {
			this.usuarioGuardado.emit(this.usuarioForm.value);

			this.usuarioForm.reset({ rol: 'Usuario' });
		} else {
			this.usuarioForm.markAllAsTouched();
		}
	}

	cancelar() {
		this.usuarioForm.reset({ rol: 'Usuario' });
		this.cerrarModal.emit();
	}
}
