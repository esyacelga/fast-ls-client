import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {Util} from '../../system/generic/classes/util';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {COLOR_TOAST_DARK, COLOR_TOAST_ERROR, COLOR_TOAST_MEDIUM, OFFLINE} from '../../system/generic/classes/constant';
import {Network} from '@ionic-native/network/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private internetConection = true;

    constructor(private genericService: ExecuteCallProcedureService,
                private utils: Util,
                private google: GooglePlus,
                private svrNet: Network,
                private svrFB: Facebook,
                private platform: Platform,
                private svrAuth: AngularFireAuth) {

        if (this.platform.is('cordova')) {
            this.svrNet.onDisconnect().subscribe(() => {
                this.internetConection = false;
            });
            this.svrNet.onConnect().subscribe(() => {
                this.internetConection = true;
            });
        }
    }


    loginWithGoogle() {
        if (this.internetConection === false) {
            this.utils.presentToast(OFFLINE, COLOR_TOAST_MEDIUM, 'bottom');
            return null;
        }

        return this.google.login({}).then(result => {
            const userDataGoogle = result;
            console.log(result);
            return this.svrAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accessToken));
        });
    }

    loginWithFaceBook() {
        if (this.internetConection === false) {
            this.utils.presentToast(OFFLINE, COLOR_TOAST_MEDIUM, 'bottom');
            return null;
        }
        const promesa = new Promise(async (resolve, reject) => {
            this.svrFB.login(['email', 'public_profile']).then((responce: FacebookLoginResponse) => {
                const credencialFB = auth.FacebookAuthProvider.credential(responce.authResponse.accessToken);
                this.svrAuth.auth.signInWithCredential(credencialFB).then((objResponce) => {
                    resolve(objResponce);
                }, error => {
                    this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_ERROR);
                    reject(error);
                });
            }, (error) => {
                this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_DARK);
            });
        });
        return promesa;
    }

}
