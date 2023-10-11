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
// import { Component } from '@angular/core';
// import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
// import { AuthService } from '../Services/auth.service';
// import { UserCredential } from 'firebase/auth';

// @Component({
//   selector: 'app-page-co',
//   templateUrl: './page-co.component.html',
//   styleUrls: ['./page-co.component.scss']
// })

// export class PageCoComponent implements CanActivateFn {
//   title = 'NgAppDating';
//   userCreds!: UserCredential | null;
//   formulaireRempli: boolean = false;

//   constructor(private readonly authService: AuthService,
//      private readonly router: Router)
//       {}

//       CanActivateFn(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     if (this.authService.isUserLoggedInWithGoogle()) {
//       return true;
//     } else {
//       this.router.navigate(['/page-app']);
//       return false;
//     }
//   }

//   async actions(type: string, payload?: any) {
//     switch (type) {
//       case 'singin':
//         this.userCreds = await this.authService.signinWithGoogle();

//         if (this.formulaireRempli) {
//           this.router.navigateByUrl('/page-app');
//         } else {
//           this.router.navigateByUrl('/formulaire');
//         }
//         break;
//       case 'singout':
//         await this.authService.singOut();
//         this.userCreds = null;
//         break;
//       default:
//         break;
//     }
//   }
// }
