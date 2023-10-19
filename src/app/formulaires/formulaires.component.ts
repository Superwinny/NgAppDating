import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../Services/firebase.service';
import { AuthService } from '../Services/auth.service';
import { firstValueFrom } from 'rxjs';
import { APIService } from '../Services/api.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormulairesComponent {

  selectedOption: string = '';
  // selectedDesire: string = '';
  // selectedLookingFor: string = '';
  selectedPassion: string[] = [];
  selectedPassionsCount: number = 0;
  uploadedImageUrls: (string | null)[] = [null, null, null, null, null, null];
  birthday: string = '';
  filteredCities: string[] = [];
  formulaireToDisplay : string = 'firstname'

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
    ])),
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
    private readonly _api: APIService,


  ) {
  }

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
    this.selectedOption = desire;
    this.form.get('desire')?.setValue(desire);
  }

  setLookingFor(lookingFor: string) {
    this.selectedOption = lookingFor;
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


  setFormToDisplay(form: string){
    this.formulaireToDisplay = form
  }

  testdate(event: any){
    const dateFromIonDatetime = event.detail.value;
    const formattedString = format(parseISO(dateFromIonDatetime), 'yyyy/MM/dd');
    this.form.patchValue({
      birthday : formattedString
    })
  }
  // async searchCities(cityName: string | undefined) {
  //   if (cityName !== undefined && cityName.length >= 3) {
  //     const apiKey = 'votre_clé_api'; // Remplacez 'votre_clé_api' par votre clé API
  //     const apiUrl = `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${cityName}&maxRows=10&username=${apiKey}`;

  //     try {
  //       const data = await this._api.getCities(apiUrl);
  //       data.subscribe((response: any) => {
  //         this.filteredCities = response.postalCodes.map((item: any) => item.placeName);
  //       });
  //     } catch (error) {
  //       console.error('Erreur lors de la recherche de villes :', error);
  //     }
  //   } else {
  //     this.filteredCities = [];
  //   }
  // }

}
