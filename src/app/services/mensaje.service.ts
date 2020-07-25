import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor() { }


  mensajeSuccess(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  mensajeAdvertencia(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
  }
  mensajeError(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }


}
