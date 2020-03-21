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
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {ComponentModule} from './modules/components/component.module';
import {IonicStorageModule} from '@ionic/storage';
import {MenuComponent} from './modules/components/menu/menu.component';

@NgModule({
    declarations: [AppComponent, MenuComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RestConectionModule, IonicStorageModule.forRoot()],
    providers: [
        ComponentModule,
        Camera,
        FileTransfer,
        StatusBar,
        Geolocation,
        PipesModule,
        SplashScreen,
        OneSignal,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
