import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {Util} from '../../system/generic/classes/util';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {COLOR_TOAST_DARK, COLOR_TOAST_ERROR, COLOR_TOAST_MEDIUM} from '../../system/generic/classes/constant';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private genericService: ExecuteCallProcedureService,
                private utils: Util,
                private google: GooglePlus,
                private svrFB: Facebook,
                private svrAuth: AngularFireAuth) {

    }


    loginWithGoogle() {
        console.log('loginWithGoogle');
        return this.google.login({}).then(result => {
            const userDataGoogle = result;
            console.log(result);
            return this.svrAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accessToken));
        });
    }

    loginWithFaceBook() {
        const promesa = new Promise(async (resolve, reject) => {
            this.svrFB.login(['email', 'public_profile']).then((responce: FacebookLoginResponse) => {
                const credencialFB = auth.FacebookAuthProvider.credential(responce.authResponse.accessToken);
                this.svrAuth.auth.signInWithCredential(credencialFB).then((objResponce) => {
                    this.utils.presentToast(JSON.stringify(objResponce), COLOR_TOAST_MEDIUM);
                    resolve(objResponce);
                }, error => {
                    this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_ERROR);
                    reject(error);
                });
            }, (error) => {
                console.error(error);
                this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_DARK);
            });
        });
        return promesa;
    }

}
