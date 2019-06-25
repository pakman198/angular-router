import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), canLoad: [AuthGuard] },
  { path: 'crisis-center', loadChildren: () => import('./crisis-center/crisis-center.module').then(mod => mod.CrisisCenterModule) },
  { path: '',   redirectTo: '/superheroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes, { 
        enableTracing: true , // <-- debugging purposes only
        preloadingStrategy: PreloadAllModules
      }
    ),
  ],
  exports: [ 
    RouterModule
  ]
})
export class AppRoutingModule { }
