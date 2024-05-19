import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'home',component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
