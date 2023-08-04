import { Component } from '@angular/core';
import { HttpService } from '../__service/http.service';
import { SnackService } from '../__service/snack.service';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  users: any;
  page: number = 1;
  pages: number = 1;
  ifFirst: boolean = false;
  ifEnd: boolean = false;
  showlist: boolean = true;
  addUser: boolean = false;
  editUser: boolean = false;
  user: any;

  constructor(
    private http: HttpService,
    private _snackBar: SnackService,
    private router: Router,
    private dialogDelet: MatDialog
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  columns: string[] = ['id', 'username', 'action'];

  getList() {
    let body = {
      page: this.page,
    };
    this.http
      .POST('/api/list', body)
      .then((res: any) => {
        this.users = res.info;
        this.page = res.page;
        this.pages = res.pages;

        // console.log(res);
      })
      .then(() => {
        this.ifFirst = this.page === 1 ? true : false;
        this.ifEnd = this.page === this.pages ? true : false;
      })
      .catch((err) => {
        if (err.includes('Unauthorized')) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }
        this._snackBar.openSnackBar(err, 'error', 1000);
      });
  }

  // updateUser(){
  //   this.
  // }

  onBack() {
    this.ifFirst = this.page === 1 ? true : false;
    this.page = this.page === 1 ? this.page : this.page--;
  }
  onNext() {
    this.ifEnd = this.page === this.pages ? true : false;
    this.page = this.page = this.pages ? this.page : this.pages++;
  }
  onAddUser() {
    this.addUser = true;
    this.editUser = false;
    this.showlist = false;
  }
  onEditUser(e: any) {
    this.user = e;
    //
    this.addUser = false;
    this.editUser = true;
    this.showlist = false;

    // console.log(e);
  }
  onDeleteUser(){
    
  }

  openDialog() {
    this.dialogDelet.open(DeleteDialogComponent);
  }

  onControls(e: any) {
    console.log(e);
    if (e.control === 'close') {
      this.addUser = false;
      this.editUser = false;
      this.showlist = true;
    } else if (e.control === 'closecall') {
      this.getList();
      this.addUser = false;
      this.editUser = false;
      this.showlist = true;
    }
  }
}
