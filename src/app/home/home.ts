import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, RouterLink],
  template: `
    <div class="home-container">
      <h2 class="mat-h2">Welcome to LemonJuice!</h2>
      <p>Your one-stop solution for all things citrus.</p>
      <button mat-raised-button color="primary" routerLink="/manager">Login as Manger</button>
    </div>
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
export class Home {}
