import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SimpleDialog } from './simple-dialog/simple-dialog';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  showToast(
    message: string,
    action: string = 'Close',
    duration: number = 3000,
    config?: MatSnackBarConfig,
  ) {
    this.snackBar.open(message, action, {
      duration,
      ...config,
    });
  }

  shadowDialog(
    title: string,
    content: string,
    okText: string = 'OK',
    cancelText?: string,
    customConfig?: MatDialogConfig,
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(
      SimpleDialog,
      customConfig || {
        width: '300px',
        data: { title, content, okText, cancelText },
      },
    );
    return dialogRef.afterClosed();
  }
}
