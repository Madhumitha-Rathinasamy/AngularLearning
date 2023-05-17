import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';
import { LoginComponent } from './modules/login/login.component';
const routes: Routes = [

  { path: '', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule) },
  { path: 'user', loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule) },
  { path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then(m => m.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
