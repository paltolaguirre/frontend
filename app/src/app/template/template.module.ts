import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { MainComponent } from './shell/main/main.component';
import { MenuComponent } from './shell/menu/menu.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

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
            path: 'formulas',
            loadChildren: () => import('../formula/formulas.module').then(m => m.FormulasContainerModule),
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
            path: 'siradig',
            loadChildren: () => import('../siradig/siradig.module').then(m => m.SiradigModule)
          },
          {
            path: 'informes/liquidacion-final-anual-f1357',
            loadChildren: () => import('../f1357liquidacionfinalanual/f1357liquidacionfinalanual.module').then(m => m.F1357liquidacionfinalanualModule)
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
