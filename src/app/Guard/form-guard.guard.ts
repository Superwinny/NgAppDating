import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';



 export const formGuardGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService)
   const router = inject(Router)
     if (authService.hasFilledForm()) {
       router.navigate(['/pageapp'])
       return false
     } else {
       return true
   }
  }
