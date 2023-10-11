import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulairesComponent } from './formulaires/formulaires.component';
import { PageCoComponent } from './page-co/page-co.component';
import { PageAppComponent } from './page-app/page-app.component';

const routes: Routes = [
  {path: 'pageco', component: PageCoComponent,
   canActivate: [FormulairesComponent]},
  {path: 'formulaire', component: FormulairesComponent,
  canActivate: [PageAppComponent]},
  {path: 'pageapp', component: PageAppComponent},
  {path: '', redirectTo: "pageco", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
