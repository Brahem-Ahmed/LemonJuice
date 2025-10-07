import { Injectable } from '@angular/core';
import { Auth, IAuthStatus, IServerAuthResponse } from './auth';
import { Observable, of, throwError } from 'rxjs';
import { Role } from './auth.enum';
import { sign } from 'fake-jwt-sign';
import { IUser, PhoneType, User } from '../user/user/user';
@Injectable({
  providedIn: 'root',
})
export class InMemoryAuth extends Auth {
  protected override transformJwtToken(token: unknown): IAuthStatus {
    // token is expected to be the decoded payload produced by the dev signer
    const t = token as any;
    const roleValue = t && t.userRole ? (t.userRole as Role) : Role.None;
    const userRole = Object.values(Role).includes(roleValue) ? (roleValue as Role) : Role.None;
    return {
      isAuthenticated: !!(t && t.isAuthenticated),
      userId: t && t.userId ? String(t.userId) : '',
      userRole,
    } as IAuthStatus;
  }
  protected override getCurrentUser(): Observable<IUser> {
    // Return the in-memory default user as an observable
    return of(this.defaultUser);
  }
  constructor() {
    super();
    console.log(
      'InMemoryAuth Service Initialized. This is a mock service. Should not be used in production.',
    );
    if (this.hasExpiredToken()) {
      console.warn('Stored token has expired, logging out.');
      this.logout(true);
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken());
    }
  }
  protected authProvider(email: string, password: string): Observable<IServerAuthResponse> {
    email = email.toLowerCase();
    password = password.toLowerCase();
    if (!email.endsWith('@test.com')) {
      return throwError(() => new Error('Invalid email domain. Use @test.com'));
    }
    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Inventory
        : email.includes('manager')
          ? Role.Manager
          : email.includes('clerk')
            ? Role.Clerk
            : Role.None,
    } as IAuthStatus;
    // authStatus.userRole is typed as string while User.role expects Role
    this.defaultUser.role = authStatus.userRole as Role;
    const authResponse = {
      accessToken: sign(authStatus, 'secretKey', { expiresIn: '1h', algorithm: 'none' }),
    } as IServerAuthResponse;
    return of(authResponse);
  }
  private defaultUser = User.Build({
    _id: '1',
    name: { first: 'Ahmed', last: 'Brahem' },
    fullName: 'Ahmed Brahem',
    email: 'manager@test.com',
    picture: 'https://i.pravatar.cc/150?img=3',
    role: Role.Manager,
    userStatus: true,
    dateOFBirth: new Date('1990-01-01'),
    level: 1,
    address: { line1: '123 Main St', line2: '', city: 'City', state: 'State', zip: '12345' },
    phones: [{ number: '123-456-7890', type: PhoneType.Home, digits: '1234567890', id: 1 }],
  });
}
