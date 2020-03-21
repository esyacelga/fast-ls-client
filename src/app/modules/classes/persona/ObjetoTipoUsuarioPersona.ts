export class ObjetoTipoUsuarioPersona {
    _id: string;
    persona: Persona = new Persona();
    usuario: Usuario = new Usuario();
}


export class Persona {
    nombres: string;
    apellidos: string;
    correo: string;
}

export class Usuario {
    _id: string;
    playerId: string;
    avatar: string;
}
