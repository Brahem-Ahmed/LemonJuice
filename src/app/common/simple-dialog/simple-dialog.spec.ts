import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDialog, SimpleDialogData } from './simple-dialog';
import { commonTestingModules } from '../common.testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

class MatDialogRefMock {
  close = jasmine.createSpy('close');
}

describe('SimpleDialog', () => {
  let component: SimpleDialog;
  let fixture: ComponentFixture<SimpleDialog>;

  beforeEach(async () => {
    const mockData: SimpleDialogData = {
      title: 'T',
      content: 'C',
      okText: 'Ok',
      cancelText: 'Cancel',
    };

    await TestBed.configureTestingModule({
      imports: [...commonTestingModules, SimpleDialog],
      providers: [
        { provide: MatDialogRef, useValue: new MatDialogRefMock() },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
