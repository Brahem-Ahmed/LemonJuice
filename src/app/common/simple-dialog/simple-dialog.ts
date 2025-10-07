import { Component, Inject, Optional } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface SimpleDialogData {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
}

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data?.title }}</h2>
    <mat-dialog-content>
      <p>{{ data?.content }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <span class="flex-spacer"></span>
      @if (data?.cancelText) {
        <button mat-button [mat-dialog-close]="false">{{ data?.cancelText }}</button>
      }
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        {{ data?.okText || 'OK' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [``],
})
export class SimpleDialog {
  constructor(
    @Optional() public dialogRef: MatDialogRef<SimpleDialog> | null,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData | null,
  ) {}
}
