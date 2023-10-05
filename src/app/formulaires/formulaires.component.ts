import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.scss']
})
export class FormulairesComponent {

    form: FormGroup = new FormGroup({
    firstname: new FormControl("David", Validators.compose([
      Validators.required,

    ])),
    birthday: new FormControl("Dos Santos", Validators.compose([
      Validators.required,
    ])),
    gender: new FormControl("Homme", Validators.compose([
      Validators.required,
    ])),
    desire: new FormControl("Relation", Validators.compose([
      Validators.required,
    ])),
    lookingfor: new FormControl("Femme", Validators.compose([
      Validators.required,
    ])),
    passion: new FormControl("ESport", Validators.compose([
      Validators.required,
    ])),
    photo: new FormControl("", Validators.compose([
      Validators.required,
    ])),

  })
  constructor(
    private readonly router: Router,

  ) { }


  async validateForm() {

    //  const formGroup = this.form.value;


    //  this.userinfo.list('/users').push(formGroup).then(() => {
    //   console.log('Données enregistrées avec succès dans Firebase');
      console.log(this.form.value);

       this.router.navigate(['/pageapp']);
    //  })
    };

}
