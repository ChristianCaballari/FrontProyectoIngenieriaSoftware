import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor() {}


   Toast = Swal.mixin({
     toast: true,
     position: 'top-right',
     iconColor: 'white',
     customClass: {
       popup: 'colored-toast'
     },
     showConfirmButton: false,
     timer: 1500,
     timerProgressBar: true
   })


   preguntar(mensaje:any){
    let boolean = 'false';
    Swal.fire({
      title: 'Estas Seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
    return boolean;
   }

}
