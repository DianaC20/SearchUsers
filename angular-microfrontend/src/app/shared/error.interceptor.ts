import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../core/services/error.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error en la solicitud.';

      if (error.status === 0) {
        errorMessage = 'Error de red: No se pudo conectar al servidor.';
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage = `Error del cliente: ${error.error.message || error.message}`;
      } else if (error.status >= 500) {
        errorMessage = 'Error del servidor: Inténtelo de nuevo más tarde.';
      }

      console.error('Error en la solicitud:', errorMessage);
      errorService.setError(errorMessage); 
      return throwError(() => new Error(errorMessage));
    })
  );
};