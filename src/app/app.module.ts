import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RestConectionModule} from './modules/system/generic/rest-conection/rest-conection.module';
import {PipesModule} from './modules/pipes/pipes.module';
import {Camera} from '@ionic-native/camera/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {ComponentModule} from './modules/components/component.module';
import {IonicStorageModule} from '@ionic/storage';
import {MenuComponent} from './modules/components/menu/menu.component';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {firebaseConfig} from '../environments/environment';
import {Facebook} from '@ionic-native/facebook/ngx';
import {Network} from '@ionic-native/network/ngx';

@NgModule({
    declarations: [AppComponent, MenuComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RestConectionModule,
        IonicStorageModule.forRoot(), AngularFireAuthModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule],
    providers: [
        Network,
        Facebook,
        GooglePlus,
        ComponentModule,
        Camera,
        FileTransfer,
        StatusBar,
        PipesModule,
        SplashScreen,
        OneSignal,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
