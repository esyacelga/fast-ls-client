import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./modules/pages/tabModule/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {path: '', pathMatch: 'full', redirectTo: 'black'},
    {path: 'login', loadChildren: './modules/pages/login/login.module#LoginPageModule'},
    {path: 'articulo', loadChildren: './modules/pages/mensajeria/articulo/articulo.module#ArticuloPageModule'},
    {path: 'segmento', loadChildren: './modules/pages/mensajeria/segmento/segmento.module#SegmentoPageModule'},
    {path: 'managment', loadChildren: './modules/pages/notificacion/managment/managment.module#ManagmentPageModule'},
    {path: 'sector', loadChildren: './modules/pages/persona/sector/sector.module#SectorPageModule'},
    {path: 'tipo-usuario', loadChildren: './modules/pages/persona/tipo-usuario/tipo-usuario.module#TipoUsuarioPageModule'},
    {path: 'tipo-articulo', loadChildren: './modules/pages/mensajeria/tipo-articulo/tipo-articulo.module#TipoArticuloPageModule'},
    {path: 'black', loadChildren: './modules/pages/login/black/black.module#BlackPageModule'},
    {
        path: 'notificacion-masiva',
        loadChildren: './modules/pages/notificacion/notificacion-masiva/notificacion-masiva.module#NotificacionMasivaPageModule'
    },
  { path: 'vehiculo', loadChildren: './modules/pages/ruta/vehiculo/vehiculo.module#VehiculoPageModule' },
  { path: 'rol-persona', loadChildren: './modules/pages/ruta/rol-persona/rol-persona.module#RolPersonaPageModule' },
  { path: 'unidad-disponibilidad', loadChildren: './modules/pages/ruta/unidad-disponibilidad/unidad-disponibilidad.module#UnidadDisponibilidadPageModule' },
  { path: 'rol-usuario/:idPersona', loadChildren: './modules/pages/login/rol-usuario/rol-usuario.module#RolUsuarioPageModule' },  { path: 'estado-ruta', loadChildren: './modules/pages/ruta/estado-ruta/estado-ruta.module#EstadoRutaPageModule' }





];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
