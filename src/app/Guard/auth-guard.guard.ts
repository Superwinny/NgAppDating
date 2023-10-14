import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
    if (authService.isUserLoggedInWithGoogle()) {
      router.navigate(['/page-app']);
      return false
  } else {

    return true;
  }

};
