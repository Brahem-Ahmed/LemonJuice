import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { commonTestingModules } from './common/common.testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonTestingModules, App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // The template renders 'LemonJuice' inside an H1; adjust expectation accordingly
    expect(compiled.querySelector('h1')?.textContent).toContain('LemonJuice');
  });
});
