import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(private router:Router){}

  // constructor(private dialog: MatDialog){}
  // onClose(){
  //   localStorage.setItem('toggle', 'N')

  // }
  // logout(){
  //   localStorage.clear();
  //   this.router.navigateByUrl('/login');
  // }
}
