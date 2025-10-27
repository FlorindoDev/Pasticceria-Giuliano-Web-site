import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../_services/loading/loading.service';

export function loadingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const loadingService = inject(LoadingService);
  console.log(request.headers);
  if (request.headers.has('X-No-Loading')) {
    return next(request);
  }

  loadingService.show();

  return next(request).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
}
