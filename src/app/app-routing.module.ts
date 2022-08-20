import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'programmes', component: ProgrammesComponent },
  { path: 'inscription', component: InscriptionsComponent },
  { path: '', component: LoginComponent },
  { path: 'role', component: RoleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
