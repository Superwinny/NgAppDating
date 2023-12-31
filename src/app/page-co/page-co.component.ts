import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-page-co',
  templateUrl: './page-co.component.html',
  styleUrls: ['./page-co.component.scss']
})

export class PageCoComponent {
  title = 'NgAppDating';
  userCreds!: UserCredential | null;


  constructor(
      private readonly authService: AuthService,
      private readonly router: Router)
      {}




  async actions(type: string, payload?: any) {
    switch (type) {
      case 'singin':
        this.userCreds = await this.authService.signinWithGoogle();

        this.router.navigateByUrl('/formulaire');
        break;
      case 'singout':
        await this.authService.singOut();
        this.userCreds = null;
        break;
      default:
        break;
    }
  }
}
