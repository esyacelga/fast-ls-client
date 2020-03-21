export class RegistroMensajes {
    error_messages = {
        'fechaNacimiento': [
            {type: 'required', message: 'Fecha de nacimiento es requerido'}
        ],
        'correo': [
            {type: 'required', message: 'Correo es requerido'},
            {type: 'minlength', message: 'Debe ser mayor o igual a 6 caracteres'},
            {type: 'maxlength', message: 'Debe ser menor o igual a 30 caracteres'}
        ],
        'clave': [
            {type: 'required', message: 'Password es requerido'},
            {type: 'minlength', message: 'Debe ser mayor o igual a 6 caracteres'},
            {type: 'maxlength', message: 'Debe ser menor o igual a 30 caracteres'}

        ],
        'cedula': [
            {type: 'minlength', message: 'Debe ser mayor o igual a 9 caracteres'},
            {type: 'maxlength', message: 'Debe ser menor o igual a 10 caracteres'}

        ],
        'passwordValidator': [
            {type: 'required', message: 'La validación del password es requrido'},
            {type: 'minlength', message: 'Debe ser mayor o igual a 6 caracteres'},
            {type: 'maxlength', message: 'Debe ser menor o igual a 30 caracteres'}

        ],
        'nombres': [
            {type: 'required', message: 'Los nombres son requerido'},
            {type: 'minlength', message: 'Debe ser mayor o igual a 6 caracteres'},
            {type: 'maxlength', message: 'Debe ser menor o igual a 30 caracteres'}

        ],
        'apellidos': [
            {type: 'required', message: 'Los apellidos son requeridos'},
            {type: 'minlength', message: 'Debe ser mayor o igual a 6 caracteres'},
            {type: 'maxlength', message: 'Debe ser menor o igual a 30 caracteres'}

        ]
    };
}
