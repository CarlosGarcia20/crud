import { Injectable, inject } from '@angular/core';
import { Supabase } from '../../../shared/services/supabase';
import { from, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UsuariosServices {
  private supabase = inject(Supabase).cliente

  obtenerUsuarios(): Observable<any[]> {
    const consulta = this.supabase
      .from('usuarios')
      .select('*')
      .order('id', { ascending: true });

    return from(consulta).pipe(
      map(res => res.data || [])
    )
  }

  crearUsuario(usuario: any): Observable<any> {
    const consulta = this.supabase
      .from('usuarios')
      .insert([usuario])
      .select();

    return from(consulta).pipe(
      map(respuesta => respuesta.data?.[0])
    );
  }

  actualizarUsuario(id: number, datos: any): Observable<any> {
    const consulta = this.supabase
      .from('usuarios')
      .update(datos)
      .eq('id', id)
      .select();

    return from(consulta).pipe(
      map(respuesta => respuesta.data?.[0])
    );
  }

  eliminarUsuario(id: number): Observable<any> {
    const consulta = this.supabase
      .from('usuarios')
      .delete()
      .eq('id', id);

    return from(consulta);
  }
}
