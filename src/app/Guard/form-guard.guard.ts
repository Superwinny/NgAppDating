import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';



export const formGuardGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService)
  // const router = inject(Router)
  //   if (authService.hasFilledForm()) {
  //     router.navigate(['/page-app'])
  //     return true
  //   } else {

  //   router.navigate(['/formulaire']);
  //  return false
  // }
  return true
};
