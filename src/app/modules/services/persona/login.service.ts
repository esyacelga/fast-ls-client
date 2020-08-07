import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {Util} from '../../system/generic/classes/util';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private genericService: ExecuteCallProcedureService,
                private utils: Util, private google: GooglePlus,
                private svrAuth: AngularFireAuth) {

    }


    loginWithGoogle() {
        return this.google.login({}).then(result => {
            const userDataGoogle = result;
            return this.svrAuth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accessToken));
        });
    }

}
