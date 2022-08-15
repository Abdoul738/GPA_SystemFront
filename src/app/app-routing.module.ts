import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { HomeComponent } from './home/home.component';
import { AddpatrimoineComponent } from './addpatrimoine/addpatrimoine.component';
import { ListepatrimoinesComponent } from './listepatrimoines/listepatrimoines.component';
import { DetailpatrimoineComponent } from './detailpatrimoine/detailpatrimoine.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { ProgrammesComponent } from './programmes/programmes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'programmes', component: ProgrammesComponent },
  { path: 'inscription', component: InscriptionsComponent },
  { path: '', component: LoginComponent },
  { path: 'addpatrimoine', component: AddpatrimoineComponent },
  { path: 'listepatrimoine', component: ListepatrimoinesComponent },
  { path: 'detailpatrimoine', component: DetailpatrimoineComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'adminview', component: AdminviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
