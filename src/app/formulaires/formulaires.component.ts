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
    firstname: new FormControl("", Validators.compose([
      Validators.required,

    ])),
    lastname: new FormControl("", Validators.compose([
      Validators.required,
    ]))

  })
  constructor(
    private readonly router: Router,
  ) { }


  //  async validateForm(){


  //   this.router.navigateByUrl()
  //  }

}
