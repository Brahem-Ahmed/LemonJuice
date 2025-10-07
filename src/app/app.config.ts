import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { InMemoryAuth } from './auth/auth.in-memory';
import { Auth } from './auth/auth';
import { UiService } from './common/ui-service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: Auth, useExisting: InMemoryAuth },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    UiService,
  ],
};
