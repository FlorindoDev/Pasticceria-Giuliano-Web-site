import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
  if (authService.isUserAuthenticated()) {
    return true;
  } else {
    toastr.warning("Perfavore fai il login", "Unauthorized!");
    return router.parseUrl("/"); //return a UrlTree
  }
};
