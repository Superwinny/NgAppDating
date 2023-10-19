import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';


 export const formGuardGuard  = async () => {
   const firebaseService = inject(FirebaseService)
   const router = inject(Router)
     if ( await firebaseService.hasFilledForm()) {
       router.navigate(['/pageapp'])
       return false
     } else {
       return true
   }
  }
