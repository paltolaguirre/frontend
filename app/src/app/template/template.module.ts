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
            loadChildren: '../legajo/legajo.module#LegajoModule',
          },
          {
            path: 'conceptos',
            loadChildren: '../concepto/concepto.module#ConceptoModule',
          },
          {
            path: 'novedades',
            loadChildren: '../novedad/novedad.module#NovedadModule',
          },
          {
            path: 'liquidaciones',
            loadChildren: '../liquidacion/liquidacion.module#LiquidacionModule',
          },
          {
            path: 'librosueldos',
            loadChildren: '../librosueldos/librosueldos.module#LibrosueldosModule',
          },
          {
            path: 'informe931',
            loadChildren: '../f931/f931.module#F931Module',
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
