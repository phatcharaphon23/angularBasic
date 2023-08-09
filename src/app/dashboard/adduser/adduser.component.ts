import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/__service/http.service';
import { SnackService } from 'src/app/__service/snack.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent {
  
  username: string = '';
  users: any;
  submitted: boolean = false;
  hide: boolean = true;

  id = new FormControl('');
  idList: string[] = ['7', '8', '9', '10'];

  form = new FormGroup({
    // username: new FormControl('', [Validators.minLength(1)]),
    id: new FormControl('', [Validators.minLength(1)]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required])
  },
  
  );
  constructor(
    private http: HttpService,
    private _snackBar: SnackService,
    private router: Router
  ) {}

  @Input() set userinfo(value: any) {}

  @Output() controls = new EventEmitter();

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
    this.submitted = true;
    let id = this.form.get('id')?.value || '';
    let username = this.form.get('username')?.value || '';
    let confirm_password = this.form.get('confirm_password')?.value || '';
    let password = this.form.get('password')?.value || '';

    if (!username) {
      this.form.controls['username'].setErrors({ invalid: true });
    }
    if (confirm_password != password) {
      this.form.controls['confirm_password'].setErrors({ invalid: true });
      // console.log("password");
    }
    if (!password) {
      this.form.controls['password'].setErrors({ invalid: true });
      // console.log("password");
    }

    if (!id || !username || !password || confirm_password != password) {
      return;
    }
    let body = JSON.stringify({
      id: id,
      // username_org: this.username,
      username: username,
      password: password,
    });
    this.http
      .POST('/api/add_user', body)
      .then((res: any) => {
        this.controls.emit({
          control: 'closecall',
        });
        console.log(res);
      })
      .catch((err) => {
        this._snackBar.openSnackBar(err, 'error', 10000);
      })

      .finally(() => {
        this.submitted = false;
        this.form.reset
      })
      

  }
  

  onPrevent(e: ClipboardEvent) {
    e.preventDefault();
  }
}
