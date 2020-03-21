import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistroTipoUsuarioPersona} from '../../classes/persona/RegistroTipoUsuarioPersona';
import {TipoUsuario} from '../../classes/persona/TipoUsuario';
import {Sector} from '../../classes/persona/Sector';
import {RegistroMensajes} from '../../classes/login/RegistroMensajes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../interfaces/interfaces';
import {UsuarioService} from '../../services/persona/usuario.service';
import {NavController, Platform} from '@ionic/angular';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {SectorService} from '../../services/persona/sector.service';
import {TipoUsuarioPersonaService} from '../../services/persona/tipo-usuario-persona.service';
import {TipoUsuarioService} from '../../services/persona/tipo-usuario.service';
import {Util} from '../../system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';
import {PushNotificationService} from '../../system/generic/service/push-notification.service';
import {ModeloTipoUsuarioPersona, ModeloUsuario} from '../../classes/persona/TipoUsuarioPersona';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    objetoLogin = new RegistroTipoUsuarioPersona();
    objTipoUsuario = new TipoUsuario();
    lstSectores: Array<Sector>;
    registoMensajes: RegistroMensajes = new RegistroMensajes();
    error_messages = this.registoMensajes.error_messages;
    loginForm: FormGroup;
    ingresoForm: FormGroup;


    registerUser: Usuario = {
        email: '',
        password: '',
        nombre: '',
        avatar: ''
    };


    // @ts-ignore
    @ViewChild('slidePrincipal') slides: IonSlides;


    construirFormLogin() {
        this.ingresoForm = this.formFuilder.group({
            correo: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])), clave: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ]))
        });
    }

    construirFormRegistro() {
        this.loginForm = this.formFuilder.group({
            nombres: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150)
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

    constructor(private formFuilder: FormBuilder, private  util: Util,
                private svrUsuario: UsuarioService,
                private navCtrl: NavController,
                private svrRoute: Router,
                private svrStorage: StorageAppService,
                private svtNotificacion: PushNotificationService,
                private platform: Platform,
                private svrSector: SectorService, private svrTipoUsuario: TipoUsuarioService,
                private svtTipoUsuariPersona: TipoUsuarioPersonaService) {
        this.construirFormRegistro();
        this.construirFormLogin();
    }

    ngOnInit(): void {
        this.slides.lockSwipes(true);
        this.obtenerSectores();

    }

    async obtenerSectores() {
        // @ts-ignore
        this.lstSectores = await this.svrSector.obtenerSectores();
        // @ts-ignore
        this.objTipoUsuario = await this.svrTipoUsuario.buscarRegistro('descripcion', 'CLIENTE');
        console.log(this.lstSectores);
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


    async login() {
        if (this.ingresoForm.status === 'INVALID') {
            this.util.presentToast('Debe ingresar la información solicitada, (Usuario, Contraseña ).', COLOR_TOAST_WARNING);
            return;
        }
        const data: ModeloTipoUsuarioPersona[] = (await this.svrUsuario.loginUsuario(this.ingresoForm.value.correo, this.ingresoForm.value.clave)) as ModeloTipoUsuarioPersona[];
        if (data && data.length > 0) {
            const objUsuario: ModeloUsuario = data[0].usuario;
            await this.svrUsuario.actualizarPlayerId(objUsuario);
            if (data.length === 1) {
                this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
                if (this.platform.is('cordova')) {
                    this.svtNotificacion.configuracionInicial();
                }
                this.svrStorage.setStorageObject(data[0], 'usuario');
            } else {
                this.svrRoute.navigate(['/rol-usuario', data[0].persona._id]);
            }
        } else {
            // mostrar alerta de usuario y contraseña no correctos
            this.util.presentToast('Usuario y contraseña no son correctos.', COLOR_TOAST_WARNING);
        }
    }


    async registerNewUser() {
        if (this.registerUser.avatar === '' || this.registerUser.avatar === null) {
            this.registerUser.avatar = 'av-1.png';
        }
        const usuarioApp = this.loginForm.value;
        usuarioApp.tipoUsuario = this.objTipoUsuario._id;
        usuarioApp.avatar = this.registerUser.avatar;
        const data = await this.svtTipoUsuariPersona.registar(usuarioApp);
        if (data) {
            this.mostrarLogin();
        }

    }

    mostrarRegistro() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(1);
        this.slides.lockSwipes(true);
    }

    mostrarLogin() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(0);
        this.slides.lockSwipes(true);
    }


}
