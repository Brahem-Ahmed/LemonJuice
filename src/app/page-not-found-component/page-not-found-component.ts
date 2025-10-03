import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found-component',
  imports: [RouterLink],
  template: ` <p>THIS PAGE DOES NOT EXIST (404)</p>
    <a routerLink="/home">Go to Home</a>`,
  styles: ``,
})
export class PageNotFoundComponent {}
