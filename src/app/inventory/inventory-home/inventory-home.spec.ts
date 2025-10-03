import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHome } from './inventory-home';

describe('InventoryHome', () => {
  let component: InventoryHome;
  let fixture: ComponentFixture<InventoryHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
