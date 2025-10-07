import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../auth/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, combineLatest, filter, first, pipe, tap, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { emailValidator, passwordValidator } from '../common/validations';
import { UiService } from '../common/ui-service';
import { User } from '../user/user/user';
import { Role } from '../auth/auth.enum';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-component.html',
  styles: `
    .error {
      color: red;
    }
    .login-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: 1rem;
    }
    .login-card {
      width: 360px;
      max-width: 95vw;
    }
    .login-form-field {
      width: 100%;
      margin-bottom: 0.75rem;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  `,
})
export class LoginComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly uiService = inject(UiService);

  loginForm!: FormGroup;
  loginError = '';

  get redirectUrl() {
    return this.route.snapshot.queryParamMap.get('redirectUrl') || '';
  }

  ngOnInit() {
    this.authService.logout();
    this.buildLoginForm();
    console.log('Login component initialized');
  }
  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', emailValidator],
      password: ['', passwordValidator],
    });
  }
  login(submittedForm: FormGroup) {
    const login$ = this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(
        catchError((err) => {
          this.loginError = err;
          return throwError(() => new Error(err));
        }),
        tap(() => {
          /*
          this.uiService.showToast(
            `Login successful! Welcome ${this.authService.currentUser$.value.fullName}  Role: ${this.authService.currentUser$.value.role}`,
            'Close',
            3000,
          );*/
          this.uiService.shadowDialog(
            'Hello There',
            `Welcome, ${this.authService.currentUser$.value.fullName}  Role: ${this.authService.currentUser$.value.role}`,
          );
        }),
      );

    login$.subscribe({
      next: () => {
        const status = this.authService.authStatus$.value;
        const user = this.authService.currentUser$.value;
        if (status.isAuthenticated && user._id) {
          this.router.navigate([this.redirectUrl || this.homeRoutePerRole(user.role as Role)]);
        } else {
          console.warn('Login finished but auth or user not present yet', status, user);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
  private homeRoutePerRole(role: Role): string {
    switch (role) {
      case Role.Manager:
        return '/manager';
      case Role.Inventory:
        return '/inventory';
      case Role.Clerk:
        return '/clerk';
      default:
        return '/user/profile';
    }
  }
}
