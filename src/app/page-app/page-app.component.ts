import { Component } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';
import { AuthService } from '../Services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-page-app',
  templateUrl: './page-app.component.html',
  styleUrls: ['./page-app.component.scss']
})
export class PageAppComponent {
  userImages: string[]|null = [];
  UserToLike = this._firestore.loadUserToLike()
  UserArrayLike!: any;
constructor(
  private readonly _firestore: FirebaseService,
  private readonly _authservice: AuthService,

){
  this.Init()
}

async Init(){
  const user = await firstValueFrom(this._authservice.currentUser);
  if (user?.uid) {
    this.UserArrayLike = this._firestore.UserArrayLike(user.uid);
    // this.userImages = await this._firestore.getProfileImageURL();
    // console.log(this.userImages);
  }
}

}
