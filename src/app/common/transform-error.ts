import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function transformError(error: HttpErrorResponse | string) {
  let errorMessage = 'An unknown error occurred';
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else if (error.status) {
    errorMessage = `Request with ${error.status}: ${error.message} ala 9ad 9albek`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return throwError(() => new Error(errorMessage));
}
