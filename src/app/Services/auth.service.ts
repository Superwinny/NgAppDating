import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider,authState,signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = authState(this._auth as any)

  constructor(
    private readonly _auth: Auth
  ) { }
  isUserLoggedInWithGoogle(): boolean {
    return !!this._auth.currentUser && this._auth.currentUser.providerData.some(data => data.providerId === 'google.com');
  }

  async signinWithGoogle(){
    const provider = new GoogleAuthProvider();
   const userCreds = await signInWithPopup(this._auth, provider)
  return userCreds;
  }
  async singOut(){
    await signOut(this._auth);
  }


  // markFormAsFilled() {
  //   this.hasFilledForm = true;
  // }
}
