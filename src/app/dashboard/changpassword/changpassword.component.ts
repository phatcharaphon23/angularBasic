import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/__service/http.service';
import { SnackService } from 'src/app/__service/snack.service';

@Component({
  selector: 'app-changpassword',
  templateUrl: './changpassword.component.html',
  styleUrls: ['./changpassword.component.scss'],
})
export class ChangpasswordComponent {
  password: string = '';
  hide: boolean = true;
  submitted: boolean = false;

  form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
    confirm_new_password: new FormControl('', [Validators.required]),
  });

  // passwordMatchValidator(){
  //   new_password:
  // }
  @Input() set user(value: any) {
    if (value) {
      this.password = value.password;
      // console.log(value);
      this.form.patchValue({
        id: value.id,
        password: value.password,
      });
    }
  }
  @Output() controls = new EventEmitter();
  constructor(
    private http: HttpService,
    private _snackBar: SnackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.checkingPassword();
  }

  onClose() {
    this.controls.emit({
      control: 'close',
    });
  }
  onSave() {
    if (!this.submitted) {
      this.submitted = true;
      let id = this.form.get('id')?.value || '';
      let password = this.form.get('password')?.value || '';
      let new_password = this.form.get('new_password')?.value || '';
      let confirm_new_password =
        this.form.get('confirm_new_password')?.value || '';

      if (!password) {
        this.form.controls['password'].setErrors({ invalid: true });
      }
      // if (!new_password) {
      //   this.form.controls['new_password'].setErrors({ invalid: true });
      // }
      // if (confirm_new_password != new_password) {
      //   this.form.controls['confirm_new_password'].setErrors({ invalid: true });
      // }
      if (!id || !password) {
        return;
      }

      let body = JSON.stringify({
        id: id,
        password: password,
      });
      this.http.POST('/api/chang_password', body).then((res: any) => {});
    }
  }

  onPrevent(e: ClipboardEvent) {
    e.preventDefault();
  }
}
