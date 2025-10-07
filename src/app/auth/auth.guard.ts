import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Auth } from './auth';
import { inject } from '@angular/core';
import { UiService } from '../common/ui-service';
import { map, Observable, take } from 'rxjs';

export const authGuard = (route?: ActivatedRouteSnapshot) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const uiService = inject(UiService);
  return checkLogin(authService, router, uiService, route);
};

const checkLogin = (
  authService: Auth,
  router: Router,
  uiService: UiService,
  route?: ActivatedRouteSnapshot,
): Observable<boolean> => {
  return authService.authStatus$.pipe(
    map((authStatus) => {
      const roleMatch = checkRoleMatch(authStatus.userRole, route);
      const allowLogin = !!authStatus.isAuthenticated && !!roleMatch;
      if (!allowLogin) {
        showAlert(uiService, authStatus.isAuthenticated, roleMatch);
        // Redirect to login and preserve attempted URL
        router.navigate(['/login'], {
          queryParams: { redirectUrl: router.currentNavigation()?.initialUrl?.toString() || '' },
        });
      }
      return allowLogin;
    }),
    take(1), // Complete the observable after the first emission
  );
};

function showAlert(uiService: UiService, isAuthenticated: boolean, roleMatch: boolean) {
  if (!isAuthenticated) {
    uiService.showToast('You must be logged in to access this page', 'Close', 3000);
  } else if (!roleMatch) {
    uiService.showToast(
      'You do not have the required permissions to access this page',
      'Close',
      3000,
    );
  }
}

function checkRoleMatch(
  userRole: string | undefined,
  route?: ActivatedRouteSnapshot | undefined,
): boolean {
  // If no route or no role requirement, allow by role (only auth controls access)
  const required = route?.data?.['roles'] ?? route?.data?.['role'] ?? null;
  if (!required) return true;
  if (Array.isArray(required)) {
    return required.includes(userRole as string);
  }
  // single role (string)
  if (typeof required === 'string') {
    return required === userRole;
  }
  return false;
}
