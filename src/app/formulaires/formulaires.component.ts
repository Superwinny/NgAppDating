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
  selectedPassion: string[] = [];
  selectedPassionsCount: number = 0;
  uploadedImageUrls: (string | null)[] = [null, null, null, null, null, null];
  birthday: string = '';


  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.compose([Validators.required])),
    birthday: new FormControl('', Validators.compose([Validators.required])),
    gender: new FormControl('', Validators.compose([Validators.required])),
    desire: new FormControl('', Validators.compose([Validators.required])),
    lookingfor: new FormControl('', Validators.compose([Validators.required])),
    passion: new FormControl('', Validators.compose([Validators.required])),
    photo: new FormControl('', Validators.compose([Validators.required])),
    city: new FormControl('', Validators.compose([Validators.required])),
  });

  constructor(
    private readonly router: Router,
    private readonly _fireStore: FirebaseService,
    private readonly _auth: AuthService,


  ) {}

  async validateForm() {
    const user = await firstValueFrom(this._auth.currentUser);
    if (user?.uid) {
      const formData = { ...this.form.value, passions: this.selectedPassion, photos: this.uploadedImageUrls };
      this._fireStore.addDataUser(formData, user.uid);
      console.log(formData);
      this.router.navigate(['/pageapp']);
    }
  }

  async takePicture(index: number) {
    try {
      const imageUrl = await this._fireStore.takePictureAndUpload();
      console.log('Image URL:', imageUrl);
      this.uploadedImageUrls[index] = imageUrl;
    } catch (error) {
      console.error('Erreur lors de la prise de la photo et de son téléchargement :', error);
    }
  }

  setGender(gender: string) {
    this.selectedOption = gender;
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
  isPassionSelected(passion: string): boolean {
    return this.selectedPassion.includes(passion);
  }
  togglePassion(passion: string) {
  const index = this.selectedPassion.indexOf(passion);

  if (index === -1) {
    if (this.selectedPassionsCount < 7) {
      this.selectedPassion.push(passion);
      this.selectedPassionsCount++;
    }
  } else {
    this.selectedPassion.splice(index, 1);
    this.selectedPassionsCount--;
  }
}

  isButtonDisabled(): boolean {

    return !(this.selectedDesire || this.selectedLookingFor || this.selectedOption || this.selectedPassion );
  }


}
