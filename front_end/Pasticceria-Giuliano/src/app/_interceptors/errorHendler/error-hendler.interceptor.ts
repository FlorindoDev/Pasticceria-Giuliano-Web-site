import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, EMPTY } from 'rxjs';
import { errorHTTP } from './error.type';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { environment } from '../../environment.prod';

//TODO: Eliminare console.log()

export function errorHendlerInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {

  const toastr = inject(ToastrService);
  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {

      console.log(err);
      console.log(request);

      let myerr: errorHTTP;
      let myErrors = environment.myErrors;

      if (err.status >= 300 && err.status <= 399) {
        window.location.replace(err.error.url);
        return EMPTY;
      }

      if (err.status === 0) {
        myerr = { status: err.status, description: "Errore di connessione", code: "CONNECTION_ERROR" }
      } else if (myErrors.find(val => val === err.status)) {

        myerr = err.error;

      } else {

        myerr = { status: err.status, description: "Errore in aspettato", code: "UNKOWN" }
      }

      //toastr.error(`${myerr.description}`, `${myerr.code}`);

      toastr.error(`${myerr.description}`, `Errore`);

      return throwError(() => myerr);

    })
  );
}