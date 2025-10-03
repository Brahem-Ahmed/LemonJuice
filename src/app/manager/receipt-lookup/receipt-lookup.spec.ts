import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptLookup } from './receipt-lookup';

describe('ReceiptLookup', () => {
  let component: ReceiptLookup;
  let fixture: ComponentFixture<ReceiptLookup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptLookup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptLookup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
