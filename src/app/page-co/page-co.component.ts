import { Component } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-page-co',
  templateUrl: './page-co.component.html',
  styleUrls: ['./page-co.component.scss']
})

export class PageCoComponent implements CanActivateChild {
  title = 'NgAppDating';
  userCreds!: UserCredential | null;
  formulaireRempli: boolean = false;

  constructor(private readonly authService: AuthService,
     private readonly router: Router)
      {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isUserLoggedInWithGoogle()) {
      return true;
    } else {
      this.router.navigate(['/page-app']);
      return false;
    }
  }

  async actions(type: string, payload?: any) {
    switch (type) {
      case 'singin':
        this.userCreds = await this.authService.signinWithGoogle();
        // Gérez ici la logique liée au formulaire
        if (this.formulaireRempli) {
          this.router.navigateByUrl('/page-app');
        } else {
          this.router.navigateByUrl('/formulaire');
        }
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
