import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { combineLatest, filter, tap } from 'rxjs';
import { LoginComponent } from '../login-component/login-component';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, LoginComponent, AsyncPipe],
  template: `
    @if ((auth.authStatus$ | async)?.isAuthenticated) {
      <div class="home-container">
        <h2 class="mat-h2">Welcome back!</h2>
        <p>You are signed in — visit the manager dashboard.</p>
        <button mat-raised-button color="primary" (click)="goManager()">Go to Manager</button>
      </div>
    } @else {
      <app-login></app-login>
    }
  `,
  styleUrls: ['../../styles.scss'],
  styles: [
    `
      .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 32px;
        min-height: 60vh;
      }
    `,
  ],
})
export class Home implements OnInit {
  constructor(
    public auth: Auth,
    private router: Router,
  ) {}

  goManager() {
    this.router.navigate(['/manager']);
  }
  ngOnInit() {
    console.log('Home component initialized');
  }
  login() {
    this.auth.login('ahmed.brahem@test.com', 'password').subscribe({
      next: () => {
        // login stream emitted — double-check user
        const user = this.auth.currentUser$.value;
        if (this.auth.authStatus$.value.isAuthenticated && user?._id) {
          this.router.navigate(['/manager']);
        } else {
          console.warn(
            'Login completed but user/status not set',
            this.auth.authStatus$.value,
            user,
          );
        }
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
