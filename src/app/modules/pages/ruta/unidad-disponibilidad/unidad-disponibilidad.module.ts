import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnidadDisponibilidadPage } from './unidad-disponibilidad.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadDisponibilidadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnidadDisponibilidadPage]
})
export class UnidadDisponibilidadPageModule {}
