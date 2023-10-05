import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulairesComponent } from './formulaires/formulaires.component';
import { PageCoComponent } from './page-co/page-co.component';

const routes: Routes = [
  {path: 'pageco', component: PageCoComponent},
  {path: 'formulaire', component: FormulairesComponent},
  {path: '', redirectTo: "pageco", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
