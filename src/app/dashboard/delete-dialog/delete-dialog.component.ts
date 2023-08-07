import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/__service/http.service';
import { SnackService } from 'src/app/__service/snack.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  // @Output() controls = new EventEmitter();
  submitted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: SnackService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpService,
    private httpClient: HttpClient,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close({ data: 'Close' });
  }

  onConfirmDelet() {
    let id = this.data.id;
    this.submitted = true;
    let body = JSON.stringify({
      id: id,
    });
    // console.log(body);
    this.http
      .POST('/api/delete_user', body)
      .then((res: any) => {
        this.dialogRef.close({ data: 'cancelled' });
      })
      .then(() => {
        this._snackBar.openSnackBar(
          'Welcome back' + localStorage.getItem(' '),
          'success',
          4000
        );
      })
      .catch((err) => {
        this._snackBar.openSnackBar(err, 'error', 10000);
      })
      .finally(() => {
        this.submitted = false;
      });
  }
}
