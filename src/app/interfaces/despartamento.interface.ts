export interface Departamento {
     descripcion:string,
     idPais:string,
     idDistritoDep:string
}

export interface DepartamentoG{
     idDepartamento: string,
     departamento: string,
     Pronvincia: string,
     Canton: string,
     Distrito: string
}

export interface DepartamentoInsert{
     departamento: string,
     idPronvincia: string,
     idCanton: string,
     idDistritoDep: string,
     idPais: string
}

export interface DepartamentoUpdate{
     idDepartamento: string,
     departamento: string,
     idPronvincia: string,
     idCanton: string,
     idDistritoDep: string,
     idPais: string
}
