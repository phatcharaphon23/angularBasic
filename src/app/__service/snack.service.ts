import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private _snackBar :MatSnackBar) { }

  openSnackBar( msg: string, msgType: string,timeout:number) {
    this._snackBar.open(msg, 'กดปิด', {
      duration:timeout,
      
      horizontalPosition: 'end',
      verticalPosition: 'top',
    panelClass:[msgType]
    });
  }
}
