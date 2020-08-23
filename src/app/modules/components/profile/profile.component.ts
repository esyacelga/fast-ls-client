import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistroMensajes} from '../../classes/login/RegistroMensajes';
import {SectorService} from '../../services/persona/sector.service';
import {TipoUsuarioService} from '../../services/persona/tipo-usuario.service';
import {Sector} from '../../classes/persona/Sector';
import {Util} from '../../system/generic/classes/util';
import {COLOR_TOAST_DARK, COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';
import {ModeloPersona, ModeloTipoUsuarioPersona, TipoUsuarioPersonaDto} from '../../classes/persona/TipoUsuarioPersona';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {PersonaService} from '../../services/persona/persona.service';
import {ModalController} from '@ionic/angular';
import {TipoUsuarioPersonaService} from '../../services/persona/tipo-usuario-persona.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    imagen: string;
    ruta: string;
    tipoUsuarioPersona: TipoUsuarioPersonaDto;
    ingresoForm: FormGroup;
    lstSectores: Sector[];
    modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;
    registoMensajes: RegistroMensajes = new RegistroMensajes();
    error_messages = this.registoMensajes.error_messages;
    esUsuarioFirebase = false;

    constructor(private formFuilder: FormBuilder, private svrSector: SectorService,
                private svtTipoUsuariPersona: TipoUsuarioPersonaService,
                private modal: ModalController,
                private svrStorage: StorageAppService,
                private modalCtrl: ModalController,
                private svrTipoUsuario: TipoUsuarioService, private util: Util, private svrPersona: PersonaService) {
        this.construirFormRegistro();
        this.cargar();
    }


    async cargar() {
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.imagen = this.modeloPersonaTipoUsuario.imagen;
        this.ruta = this.modeloPersonaTipoUsuario._id;
    }

    public cerrrarPanel() {
        this.modal.dismiss();
    }

    construirFormRegistro() {
        this.ingresoForm = this.formFuilder.group({
            nombres: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150)
            ])),
            identificacion: new FormControl('', Validators.compose([
                Validators.minLength(9),
                Validators.maxLength(10)
            ])),

            fechaNacimiento: new FormControl('', Validators.compose([
                Validators.required
            ])),
            callePrincipal: new FormControl('', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(100)
            ])),
            calleSecundaria: new FormControl('', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(100)
            ])),
            apellidos: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ])),
            segundoApellido: new FormControl('', null),
            sector: new FormControl('', null),
            correo: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30),
            ])),
            numeroTelefonoCelular: new FormControl('', Validators.compose([
                Validators.minLength(9),
                Validators.maxLength(10),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
            ])),
            numeroTelefonoConvencional: new FormControl('', Validators.compose([
                Validators.minLength(9),
                Validators.maxLength(10),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
            ]))
        });
    }


    async actualizarPersona() {
        this.tipoUsuarioPersona = this.ingresoForm.value;
        this.tipoUsuarioPersona._id = this.modeloPersonaTipoUsuario.persona._id;
        if (this.ingresoForm.status === 'VALID') {
            if (this.tipoUsuarioPersona.sector === undefined || this.tipoUsuarioPersona.sector === '') {
                this.util.presentToast('Debe ingresar el sector de domicilio', COLOR_TOAST_WARNING);
                return;
            }
            await this.svrPersona.actualizarPersona(this.tipoUsuarioPersona);
            const objTipoUsuarioPersona: ModeloTipoUsuarioPersona = (await this.svtTipoUsuariPersona.obtenerPorCorreo(this.modeloPersonaTipoUsuario.persona.correo) as ModeloTipoUsuarioPersona);
            this.svrStorage.eliminarTodo();
            this.svrStorage.setStorageObject(objTipoUsuarioPersona, 'usuario');
        } else {
            this.util.presentToast('Por favor ingrese la información solicitada', COLOR_TOAST_DARK);
        }
    }

    async ngOnInit() {
        this.lstSectores = await this.svrSector.obtenerSectores();
        const persona: ModeloPersona = await this.svrPersona.obtenerPersonaPorId(this.modeloPersonaTipoUsuario.persona._id);
        this.esUsuarioFirebase = persona.google;
        this.setearPersona(this.util.isVoid(this.modeloPersonaTipoUsuario.persona.nombres, this.modeloPersonaTipoUsuario.persona.displayName), this.modeloPersonaTipoUsuario.persona.apellidos,
            this.modeloPersonaTipoUsuario.persona.identificacion, this.modeloPersonaTipoUsuario.persona.fechaNacimiento,
            persona.sector, this.modeloPersonaTipoUsuario.usuario.clave, persona.correo, persona.numeroTelefonoConvencional, persona.numeroTelefonoCelular);
    }

    private setearPersona(nombres: string, apellidos: string, identificacion: string, fechaNacimiento, sector: string, clave: string, correo: string, numeroTelefonoConvencional, numeroTelefonoCelular) {
        this.ingresoForm.setValue({
            nombres: this.util.isNull(nombres, ''),
            apellidos: this.util.isNull(apellidos, ''),
            segundoApellido: '',
            identificacion: this.util.isNull(identificacion, ''),
            fechaNacimiento: this.util.isNull(fechaNacimiento, ''),
            callePrincipal: '',
            calleSecundaria: '',
            sector: this.util.isNull(sector, ''),
            correo: this.util.isNull(correo, ''),
            numeroTelefonoConvencional: this.util.isNull(numeroTelefonoConvencional, ''),
            numeroTelefonoCelular: this.util.isNull(numeroTelefonoCelular, ''),
        });
    }


}
