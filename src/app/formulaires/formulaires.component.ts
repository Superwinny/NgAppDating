import { Component, ViewEncapsulation } from '@angular/core';
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
  selectedDesire: string = '';
  selectedLookingFor: string = '';

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.compose([Validators.required])),
    birthday: new FormControl('', Validators.compose([Validators.required])),
    gender: new FormControl('', Validators.compose([Validators.required])),
    desire: new FormControl('', Validators.compose([Validators.required])),
    lookingfor: new FormControl('', Validators.compose([Validators.required])),
    passion: new FormControl('', Validators.compose([Validators.required])),
    photo: new FormControl('', Validators.compose([Validators.required])),
  });

  constructor(
    private readonly router: Router,
    private readonly _fireStore: FirebaseService,
    private readonly _auth: AuthService,
  ) {}

  async validateForm() {
    const user = await firstValueFrom(this._auth.currentUser);
    if (user?.uid) {
      this._fireStore.addDataUser(this.form.value, user.uid);
      console.log(this.form.value);
      this.router.navigate(['/pageapp']);
    }
  }

  async takepicture() {
    this._fireStore.takePictureAndUpload();
  }


  setGender(gender: string) {
    this.form.get('gender')?.setValue(gender);
  }

  setDesire(desire: string) {
    this.selectedDesire = desire;
    this.form.get('desire')?.setValue(desire);
  }

  setLookingFor(lookingFor: string) {
    this.selectedLookingFor = lookingFor;
    this.form.get('lookingfor')?.setValue(lookingFor);
  }



}
