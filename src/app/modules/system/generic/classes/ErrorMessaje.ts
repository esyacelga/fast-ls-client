export class ErrorMessaje {
    message: string = '';
    errors: Errors = new Errors(this.message);

    constructor(message: string) {
        this.message = message;
    }

}

export class Errors {
    message: string = '';
    errors: ErrorExtend = new ErrorExtend(this.message);

    constructor(message: string) {
        this.message = message;
    }
}

export class ErrorExtend {
    message: string = '';
    mostrarDetalle: boolean = true;


    constructor(message: string) {
        this.message = message;
    }
}
