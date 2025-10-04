import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHome } from './inventory-home';
import { commonTestingModules } from '../../common/common.testing';

describe('InventoryHome', () => {
  let component: InventoryHome;
  let fixture: ComponentFixture<InventoryHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonTestingModules, InventoryHome],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
