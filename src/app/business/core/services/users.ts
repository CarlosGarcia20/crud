import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  obtenerEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}empleados`)
  } 

  crearEmpleado(datosFormulario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}empleados`, datosFormulario);
  }

  actualizarEmpleado(idEmpleado: number, datosFormulario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}empleados/${idEmpleado}`, datosFormulario);
  }

  eliminarUsuario(idEmpleado: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}empleados/${idEmpleado}`)
  }
}
