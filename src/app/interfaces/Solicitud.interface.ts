export interface Solicitud {
     idSolicitud:string,
     archivo:string,
     comentario:string
}

export interface SolicitudDetalles {
     apellidos: string,
     nombre:string,
     idSolicitud:string,
     idUsuario:string,
     foto:string,
     fechaHora:string,
     descripcion:string,
     destalleRespuesta:string,
     asuntoDetallado:string
}