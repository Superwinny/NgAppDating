import { Component,ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import { FirebaseService } from '../Services/firebase.service';
import { AuthService } from '../Services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormulairesComponent {
  selectedOption: string = '';

    form: FormGroup = new FormGroup({
    firstname: new FormControl("", Validators.compose([
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
    private readonly _fireStore: FirebaseService,
    private readonly _auth: AuthService,
  ) { }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  async validateForm() {
      const user = await firstValueFrom(this._auth.currentUser);
      if(user?.uid){

        this._fireStore.addDataUser(this.form.value,user.uid)
        console.log(this.form.value);
         this.router.navigate(['/pageapp']);
      }

    }

}
