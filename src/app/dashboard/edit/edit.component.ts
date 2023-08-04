import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/__service/http.service';
import { JwtService } from 'src/app/__service/jwt.service';
import { SnackService } from 'src/app/__service/snack.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  username : string = '';

  users: any;
  page: number = 1;
  pages: number = 1;
  ifFirst: boolean = false;
  ifEnd: boolean = false;
  hide: boolean = true;
  showlist: boolean = true;
  addUser: boolean = false;
  editUser: boolean = false;
  submitted: boolean = false;
  //Update
  form = new FormGroup({
    // username: new FormControl('', [Validators.minLength(1)]),
    id: new FormControl({ value: '', disabled: true }),
    username: new FormControl('', [Validators.minLength(1)]),
    password: new FormControl('', [Validators.minLength(1)]),
  });
  @Input() set user(value: any) {
    if (value) {
      this.username = value.username;
      // console.log(value);
      this.form.patchValue({
        id: value.id,
        username: value.username,
        password: value.password,
      });
      this.form.controls['username'];
    }
  }

  @Output() controls = new EventEmitter();
  constructor(
    private httpClient: HttpClient,
    private http: HttpService,
    private jwt: JwtService,
    private _snackBar: SnackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getList();
    // this.onSave();
  }
  onClose() {
    this.controls.emit({
      control: 'close',
    });
  }

 

  onSave() {
    // console.log(this.user);
    if (!this.submitted) {
      this.submitted = true;
      let id = this.form.get('id')?.value || '';
      let username = this.form.get('username')?.value || '';
      let password = this.form.get('password')?.value || '';

      if (!username) {
        this.form.controls['username'].setErrors({ invalid: true });
        // console.log("// ");
      }
      if (!password) {
        this.form.controls['password'].setErrors({ ivalid: true });
        // console.log("password");
      }

      if (!username || !password) {
        return;
      }

      let body = JSON.stringify({
        id: id,
        username_org: this.username,
        username: username,
        password: password,
      });
      console.log(body);
      this.http
        .POST('/api/update_user', body)
        .then((res: any) => {
          this.controls.emit({
            control: 'closecall',
          });
          // console.log(res);
        })
        .catch((err) => {
          this._snackBar.openSnackBar(err, 'error', 10000);
        })
        .finally(() => {
          this.submitted = false;
        });
    }
  }
}
