import { Component, inject, OnInit } from '@angular/core';
import { Modal } from '../modal/modal';
import { UsuariosServices } from '../core/services/users';

@Component({
  selector: 'app-users',
  imports: [Modal],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users implements OnInit {
  private usuariosService = inject(UsuariosServices)

  modalAbierto = false;
  usuarioSeleccionado: any = null;

  usuarios: any[] = [];
  cargando = true;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (datos)  =>  {
        console.log(datos);
        
        this.usuarios = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err)
      }
    });
  }

  abrirModal(usuario: any = null) {
    this.usuarioSeleccionado = usuario ? {... usuario} : null
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.usuarioSeleccionado = null;
  }

  agregarUsuario(datosFormulario: any) {
    if (this.usuarioSeleccionado) {
      this.usuariosService.actualizarUsuario(this.usuarioSeleccionado.id, datosFormulario).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    } else {
      this.usuariosService.crearUsuario(datosFormulario).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    }
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios(); 
      });
    }  
  }

}
