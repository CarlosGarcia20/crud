import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@correo.com', rol: 'Admin' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@correo.com', rol: 'Usuario' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@correo.com', rol: 'Usuario' }
  ];

  eliminarUsuario(id: number) {
    console.log('Eliminando usuario con ID:', id);
  }

}
