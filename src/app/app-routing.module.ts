import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormulairesComponent } from './formulaires/formulaires.component';

const routes: Routes = [
  {path: 'pageco', component: AppComponent},
  // {path: 'formulaire', component: FormulairesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
