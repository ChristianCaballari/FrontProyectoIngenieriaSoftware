import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
 
  menu: any[] = [
    // { titulo: 'Principal', url: '/dashboard' },
    { titulo: 'Usuarios', url: 'usuarios'},
    { titulo: 'Reportes', url: 'reportes' },
    { titulo: 'Solicitudes Usuarios', url: 'solicitudAdmin' },
    { titulo: 'Departamentos', url: 'departamentos' },
   // { titulo: 'Logout', url: '/login' },
  ];

  menuUserROL: any[] = [
    // { titulo: 'Principal', url: '/dashboard' },
    // { titulo: 'Usuarios', url: 'usuarios'},
  //  { titulo: 'Reportes', url: 'reportes' },
    { titulo: 'Solicitudes', url: 'solicitudes' },
    // { titulo: 'Departamentos', url: 'departamentos' },
   // { titulo: 'Logout', url: '/login' },
  ];
  constructor() {}
}
