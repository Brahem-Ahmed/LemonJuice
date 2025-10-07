import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UiService } from '../common/ui-service';
import { autoSpyObj } from 'angular-unit-test-helper';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        Auth,
        { provide: UiService, useValue: autoSpyObj(UiService) },
      ],
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
