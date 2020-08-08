import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {Util} from '../../system/generic/classes/util';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';

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
        return this.google.login({}).then(result => {
            const userDataGoogle = result;
            return this.svrAuth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accessToken));
        });
    }

    loginWithFaceBook() {
        return this.svrFB.login(['emal', 'public_profile']).then((responce: FacebookLoginResponse) => {
            console.log(responce);
            const credencialFB = auth.FacebookAuthProvider.credential(responce.authResponse.accessToken);
            console.log(credencialFB);
            return this.svrAuth.signInWithCredential(credencialFB);
        });
    }

}
