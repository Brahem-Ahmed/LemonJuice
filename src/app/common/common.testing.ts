import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
export const commonTestingModules = [
  ReactiveFormsModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
  MatIconTestingModule,
] as unknown[];
export const commonTestingProviders = [
  //For Later Chapters
];
