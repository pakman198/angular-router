import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), 
    canLoad: [AuthGuard] 
  },
  { 
    path: 'crisis-center', 
    loadChildren: () => import('./crisis-center/crisis-center.module').then(mod => mod.CrisisCenterModule),
    data: { preload: true} 
  },
  { path: '',   redirectTo: '/superheroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes, { 
        enableTracing: true , // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService
      }
    ),
  ],
  providers: [
    SelectivePreloadingStrategyService 
  ],
  exports: [ 
    RouterModule
  ]
})
export class AppRoutingModule { }
