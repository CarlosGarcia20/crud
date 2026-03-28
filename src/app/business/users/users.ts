import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Modal } from '../modal/modal';
import { UsuariosService } from '../core/services/users';
import { AuthService } from '../../core/services/auth';
import Swal from 'sweetalert2';
import { Alerts } from '../../shared/services/alerts';

@Component({
	selector: 'app-users',
	imports: [Modal],
	templateUrl: './users.html',
	styleUrl: './users.css',
})

export class Users implements OnInit {
	usuarios: any[] = [];

	private usuariosService = inject(UsuariosService)
	private authService = inject(AuthService)
	private alertService = inject(Alerts)
	private cdr = inject(ChangeDetectorRef);

	modalAbierto = false;
	usuarioSeleccionado: any = null;

	ngOnInit(): void {
		this.cargarUsuarios();
	}

	cargarUsuarios() {
		this.usuariosService.obtenerEmpleados().subscribe({
			next: (datos: any) => {
				this.usuarios = datos
				this.cdr.detectChanges();
			},
			error: (err) => {
				this.usuarios = [];
				this.cdr.detectChanges();
			}
		})
	}

	abrirModal(usuario: any = null) {
		this.usuarioSeleccionado = usuario ? { ...usuario } : null
		this.modalAbierto = true;
	}

	cerrarModal() {
		this.modalAbierto = false;
		this.usuarioSeleccionado = null;
	}

	cerrarSesion() {
		this.authService.cerrarSesion();
	}

	guardarUsuario(datosFormulario: any) {
		if (this.usuarioSeleccionado) {
			this.usuariosService.actualizarEmpleado(this.usuarioSeleccionado.id, datosFormulario).subscribe(() => {
				this.alertService.mostrarExito("Información del empleado actualizada correctamente");
				this.cargarUsuarios();
				this.cerrarModal();
			});
		} else {
			this.usuariosService.crearEmpleado(datosFormulario).subscribe({
				next: (e) => {
					this.alertService.mostrarExito("Empleado guardado correctamente");
					this.cerrarModal();
					this.cargarUsuarios();
				},
				error: (e) => {
					this.alertService.mostrarError(e.error.mensaje)
				}
			})
		}
	}

	eliminarUsuario(datosFormulario: any) {
		Swal.fire({
			title: `¿Estás seguro de que deseas eliminar a ${datosFormulario.nombre}?`,
			icon: "warning",
			theme: "dark",
			showCancelButton: true,
			confirmButtonColor: '#2563EB',
			cancelButtonColor: "red"
		}).then((result) => {
			if (result.isConfirmed) {
				this.usuariosService.eliminarUsuario(datosFormulario.id).subscribe({
					next: (res) => {
						this.cargarUsuarios();
						this.alertService.mostrarExito("Empleado eliminado")
					},
					error: (err) => {
						this.alertService.mostrarError(err.error.mensaje)
					}
				})
			}
		});
	}

}
