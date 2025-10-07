/// <reference types="jasmine" />
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Auth, defaultAuthStatus } from '../auth/auth';
import { UiService } from './ui-service';
import { User } from '../user/user/user';

export const commonTestingModules = [
  ReactiveFormsModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
  MatIconTestingModule,
] as unknown[];
// Create explicit jasmine spy objects for tests so runtime doesn't rely on external helpers
const authSpy = jasmine.createSpyObj('Auth', ['login', 'logout']);
authSpy.authStatus$ = new BehaviorSubject(defaultAuthStatus);
authSpy.currentUser$ = new BehaviorSubject(new User());
(authSpy.login as jasmine.Spy).and.returnValue(of(void 0));

const uiSpy = jasmine.createSpyObj('UiService', ['showToast', 'shadowDialog']);
(uiSpy.showToast as jasmine.Spy).and.callFake(() => {});
(uiSpy.shadowDialog as jasmine.Spy).and.returnValue(of(true));

export const commonTestingProviders: any[] = [
  { provide: Auth, useValue: authSpy },
  { provide: UiService, useValue: uiSpy },
];
// Test-time helpers (spies, modules, providers) live here. Runtime code should not import this file.
