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
  hide: boolean = true;
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

  ngOnInit(): void {}

  onClose() {
    this.controls.emit({
      control: 'close',
    });
  }

  onSave() {
    if (!this.submitted) {
      this.submitted = true;
      let id = this.form.get('id')?.value || '';
      let username = this.form.get('username')?.value || '';
      let password = this.form.get('password')?.value || '';
      if (!id) {
        this.form.controls['id'].setErrors({ ivalid: true });
      }
      if (!username) {
        this.form.controls['username'].setErrors({ invalid: true });
      }
      if (!password) {
        this.form.controls['password'].setErrors({ ivalid: true });
      }

      if (!id || !username || !password) {
        return;
      }

      // let options = {
      //   headers: new HttpHeaders().set(
      //     'Content-Type',
      //     'application/json; charset=utf-8'
      //   ),
      // };

      let body = JSON.stringify({
        id: id,
        username: username,
        password: password,
      });
      console.log(body);
      this.http
        .POST('/api/update_user', body)
        .then((res: any) => {
          // console.log(res)
        })
        // .then(() => {
        //   this._snackBar.openSnackBar(
        //     'Welcome back' + localStorage.getItem('online'),
        //     'success',
        //     4000
        //   );
        //   this.router.navigateByUrl('/dashboard');
        // })
        .catch((err) => {
          if (err.includes('Unauthorized')) {
            localStorage.clear();
            this.router.navigateByUrl('/login');
          }
          this._snackBar.openSnackBar(err, 'error', 10000);
        });
        
      this.submitted = false;
    }
    // console.log(data);
  }

  onPrevent(e: ClipboardEvent) {
    e.preventDefault();
  }

  // console.log(this.form.controls['username']?.value)
}
