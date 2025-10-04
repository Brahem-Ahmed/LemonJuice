import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHome } from './manager-home';
import { commonTestingModules } from '../../common/common.testing';

describe('ManagerHome', () => {
  let component: ManagerHome;
  let fixture: ComponentFixture<ManagerHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonTestingModules, ManagerHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
