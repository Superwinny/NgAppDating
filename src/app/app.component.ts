import { Component } from '@angular/core';
import { FirebaseService } from './Services/firebase.service';
import { AuthService } from './Services/auth.service';
import { UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgAppDating';
  userCreds!: UserCredential | null;
  CurrentUser = this.authService.currentUser
  constructor(
    // private readonly _fireStoreService: FirebaseService,
     //private _router: Router,
    private readonly authService: AuthService
  ){

  }
  // async startApp(){
  //   this._router.navigateByUrl()
  // }
  async actions(type: string, payload?: any) {
    switch (true) {
      case type === 'singin':
        this.userCreds = await this.authService.signinWithGoogle();
        break;
      case type === 'singout':
        await this.authService.singOut();
        this.userCreds = null;
        break;
      default:
        break;
    }

  }

}
