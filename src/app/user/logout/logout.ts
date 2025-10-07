import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-logout',
  imports: [],
  template: ` <p>Logged out successfully.</p> `,
  styles: ``,
})
export class Logout implements OnInit {
  constructor(
    private router: Router,
    private authService: Auth,
  ) {}
  ngOnInit() {
    this.authService.logout(true);
    this.router.navigate(['/']);
  }
}
