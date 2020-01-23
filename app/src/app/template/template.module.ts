import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { MainComponent } from './shell/main/main.component';
import { MenuComponent } from './shell/menu/menu.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatToolbarModule, MatTabsModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, MainComponent, MenuComponent, FooterComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'legajos',
            loadChildren: () => import('../legajo/legajo.module').then(m => m.LegajoModule),
          },
          {
            path: 'conceptos',
            loadChildren: () => import('../concepto/concepto.module').then(m => m.ConceptoModule),
          },
          {
            path: 'novedades',
            loadChildren: () => import('../novedad/novedad.module').then(m => m.NovedadModule),
          },
          {
            path: 'liquidaciones',
            loadChildren: () => import('../liquidacion/liquidacion.module').then(m => m.LiquidacionModule),
          },
          {
            path: 'informes/libro-sueldos',
            loadChildren: () => import('../librosueldos/librosueldos.module').then(m => m.LibrosueldosModule),
          },
          {
            path: 'informes/cargas-sociales-f931',
            loadChildren: () => import('../fcargassociales/fcargassociales.module').then(m => m.FcargassocialesModule),
          },
          {
            path: '',
            redirectTo: 'legajos',
          }
        ]
      }
    ])
  ],
})
export class TemplateModule { }
