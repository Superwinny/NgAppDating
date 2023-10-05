import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    lastname: new FormControl("Dos Santos", Validators.compose([
      Validators.required,
    ]))

  })
  constructor(
    private readonly router: Router,
  ) { }


    async validateForm(){

console.log(this.form.value);

    //  this.router.navigateByUrl()
    }

}
