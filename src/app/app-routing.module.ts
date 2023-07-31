import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { LayoutLoginComponent } from './layout-login/layout-login.component';
import { GlobalService } from './__service/global.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutDashboardComponent,
    canActivate: [GlobalService],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layout-dashboard/layout-dashboard.module').then(
            (m) => m.LayoutDashboardModule
          ),
      },
    ],
  },
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layout-login/layout-login.module').then(
            (m) => m.LayoutLoginModule
          ),
      },
    ],
  },
  {
    path:'**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
