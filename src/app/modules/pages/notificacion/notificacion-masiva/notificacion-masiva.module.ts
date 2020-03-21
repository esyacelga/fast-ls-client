import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificacionMasivaPage } from './notificacion-masiva.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionMasivaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificacionMasivaPage]
})
export class NotificacionMasivaPageModule {}
