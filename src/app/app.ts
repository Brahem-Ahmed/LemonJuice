import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
  ],
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <mat-icon svgIcon="../../favicon.ico"></mat-icon>
      <a mat-button routerLink="/home"><h1>LemonJuice</h1></a>
      <span class="flex-spacer"></span>
      <button mat-icon-button routerLink="/user/profile">
        <mat-icon>account_circle</mat-icon>
      </button>
      <button mat-icon-button routerLink="/user/logout">
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['../styles.scss'],
})
export class App {
  protected readonly title = signal('LemonJuice');
}
