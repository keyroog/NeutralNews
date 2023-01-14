import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'login'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
