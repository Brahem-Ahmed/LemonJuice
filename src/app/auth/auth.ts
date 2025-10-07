import { Role } from './auth.enum';
import { IUser, User } from '../user/user/user';
import { jwtDecode } from 'jwt-decode';
import { transformError } from '../common/transform-error';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  mergeMap,
  Observable,
  pipe,
  tap,
  throwError,
} from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { CacheService } from '../common/cache.service';
export interface IAuthStatus {
  isAuthenticated: boolean;
  userId: string;
  userRole: string;
}
export interface IServerAuthResponse {
  accessToken: string;
}
export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userId: '',
  userRole: Role.None,
};

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;
  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}
@Injectable({ providedIn: 'root' })
// Basic Service Class Refer to the auth schema
export abstract class Auth implements IAuthService {
  protected readonly cache = inject(CacheService);
  readonly authStatus$: BehaviorSubject<IAuthStatus> = new BehaviorSubject<IAuthStatus>(
    defaultAuthStatus,
  );
  readonly currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(new User());
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user) => this.currentUser$.next(user)),
    catchError(transformError),
  );

  // A cold observable that, when subscribed, will trigger a resume of the current user
  // by applying the getAndUpdateUserIfAuthenticated operator to authStatus$.
  // Note: the stream is cold and will only run when subscribed.
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated,
  );
  constructor() {
    if (this.hasExpiredToken()) {
      console.warn('Stored token has expired, logging out.');
      this.logout(true);
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken());

      //To Load user on browser refresh
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0);
    }
  }
  //TODO : Caching values in local storage

  login(email: string, password: string): Observable<void> {
    this.clearToken();
    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        const token = jwtDecode(value.accessToken);
        return this.transformJwtToken(token);
      }),
      tap((status) => {
        this.authStatus$.next(status);
      }),
      this.getAndUpdateUserIfAuthenticated,
    );
    loginResponse$.subscribe({
      error: (err) => {
        this.logout();
        return throwError(() => err);
      },
    });
    return loginResponse$;
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken();
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0);
  }

  protected setToken(token: string): void {
    this.cache.setItem('authToken', token);
  }
  getToken(): string {
    // Implementation here
    return this.cache.getItem('authToken') ?? '';
  }
  protected clearToken(): void {
    this.cache.removeItem('authToken');
  }
  protected hasExpiredToken(): boolean {
    const jwt = this.getToken();
    if (!jwt) {
      return true;
    }
    const { exp } = jwtDecode<{ exp: number }>(jwt);
    return Date.now() >= exp * 1000;
  }
  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(jwtDecode(this.getToken()));
  }
  protected abstract authProvider(email: string, password: string): Observable<IServerAuthResponse>;
  protected abstract transformJwtToken(token: unknown): IAuthStatus;
  protected abstract getCurrentUser(): Observable<IUser>;
}
