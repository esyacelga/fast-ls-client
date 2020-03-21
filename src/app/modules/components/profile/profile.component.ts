import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistroMensajes} from '../../classes/login/RegistroMensajes';
import {SectorService} from '../../services/persona/sector.service';
import {TipoUsuarioService} from '../../services/persona/tipo-usuario.service';
import {Sector} from '../../classes/persona/Sector';
import {Util} from '../../system/generic/classes/util';
import {COLOR_TOAST_DARK} from '../../system/generic/classes/constant';
import {ModeloPersona, ModeloTipoUsuarioPersona, TipoUsuarioPersonaDto} from '../../classes/persona/TipoUsuarioPersona';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {PersonaService} from '../../services/persona/persona.service';
import {ModalController} from '@ionic/angular';
import {PhotoProfilePage} from '../../pages/photo-profile/photo-profile.page';

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

    constructor(private formFuilder: FormBuilder, private svrSector: SectorService,
                private svrStorage: StorageAppService, private modalCtrl: ModalController,
                private svrTipoUsuario: TipoUsuarioService, private util: Util, private svrPersona: PersonaService) {
        this.construirFormRegistro();
        this.cargar();
    }


    async cargar() {
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.imagen = this.modeloPersonaTipoUsuario.imagen;
        this.ruta = this.modeloPersonaTipoUsuario._id;
    }

    async abrirModal() {
        const modal = await this.modalCtrl.create({
            component: PhotoProfilePage,
            componentProps: {title: 's', tipoError: 's', mensaje: 'mensajeError'}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
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
            clave: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])),
            passwordValidator: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])),
            correo: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ]))
        }, {validators: this.isEquals('clave', 'passwordValidator')});
    }


    isEquals(campo: string, campoToValidate: string) {
        return (group: FormGroup) => {
            const pass1 = group.controls[campo].value;
            const pass2 = group.controls[campoToValidate].value;
            if (pass1 === pass2) {
                return null;
            } else {
                return {
                    sonIguales: true
                };
            }
        };
    }

    actualizarPersona() {
        this.tipoUsuarioPersona = this.ingresoForm.value;
        this.tipoUsuarioPersona._id = this.modeloPersonaTipoUsuario.persona._id;
        if (this.ingresoForm.status === 'VALID') {
            this.svrPersona.actualizarPersona(this.tipoUsuarioPersona);
        } else {
            this.util.presentToast('Por favor ingrese la información solicitada', COLOR_TOAST_DARK);
        }

    }

    async ngOnInit() {
        this.lstSectores = await this.svrSector.obtenerSectores();

        const persona: ModeloPersona = await this.svrPersona.obtenerPersonaPorId(this.modeloPersonaTipoUsuario.persona._id);
        this.setearPersona(this.modeloPersonaTipoUsuario.persona.nombres, this.modeloPersonaTipoUsuario.persona.apellidos,
            this.modeloPersonaTipoUsuario.persona.identificacion, this.modeloPersonaTipoUsuario.persona.fechaNacimiento,
            persona.sector, this.modeloPersonaTipoUsuario.usuario.clave, persona.correo);
    }

    setearPersona(nombres: string, apellidos: string, identificacion: string, fechaNacimiento, sector: string, clave: string, correo: string) {
        this.ingresoForm.setValue({
            nombres: nombres,
            apellidos: apellidos,
            segundoApellido: '',
            identificacion: this.util.isNull(identificacion, ''),
            fechaNacimiento: fechaNacimiento,
            callePrincipal: '',
            calleSecundaria: '',
            sector: sector,
            clave: clave,
            correo: correo,
            passwordValidator: clave
        });
    }


}
