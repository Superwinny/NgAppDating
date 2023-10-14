import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const formGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
    if (authService.userFormOk()) {
      return true
    } else {

    router.navigate(['/formulaires']);
   return false
  }
};
