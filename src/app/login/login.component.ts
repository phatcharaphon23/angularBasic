import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../__service/http.service';
import { JwtService } from '../__service/jwt.service';
import { Router } from '@angular/router';
import { SnackService } from '../__service/snack.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit{
  hide: boolean = true;
  submitted: boolean = false;

  form = new FormGroup({
    username: new FormControl('', [Validators.minLength(1)]),
    password: new FormControl('', [Validators.minLength(1)]),
  });

  constructor(
    private httpClient: HttpClient,
    private http: HttpService,
    private jwt: JwtService,
    private _snackBar: SnackService,

    private router: Router
  ) 
  {}
  // onKeyup(e: KeyboardEvent) {
  //   console.log(e.key);
  // }
  
  ngOnInit() : void{
    this.CheckLoggedIn();

  }
  CheckLoggedIn(){
    let token = localStorage.getItem('token') || '';
    try{
      let jwt = this.jwt.getDecodeAccessToken(token);
      this.router.navigateByUrl('dashboard');
    } catch (err){
      localStorage.clear();
    }
    
  }

  onSubmit() {
    if (!this.submitted) {
      this.submitted = true;
      let username = this.form.get('username')?.value || '';
      let password = this.form.get('password')?.value || '';
      if (!username) {
        this.form.controls['username'].setErrors({ invalid: true });
      }
      if (!password) {
        this.form.controls['password'].setErrors({ ivalid: true });
      }
      if (!username || !password) {
        return;
      }

      let options = {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/json; charset=utf-8'
        ),
      };

      let body = JSON.stringify({
        "username": username,
      });
      // console.log(body);
      this.httpClient.post('/gest/get_exits_token', body, options).subscribe({
        next: (data: any) => {
          // console.log(data)
          if (data.success) {
            let basic = new URLSearchParams();
            basic.set('username', username);
            basic.set('password', password);
            basic.set('client_id', data.messege.client_id);
            basic.set('client_secret', data.messege.client_secret);

            this.http
              .AUTH(basic)
              .then((res: any) => {
                // console.log(res)
                let token = this.jwt.getDecodeAccessToken(res);

                // console.log(token);
                localStorage.setItem('token', res);
                localStorage.setItem('token_type', 'bearer');
                localStorage.setItem('emp_id', token.emp_id);
                localStorage.setItem('online', token.sub);
                localStorage.setItem('authorities', token.authorities);
              })
              .then(() => {
                this._snackBar.openSnackBar(
                  'Welcome back' + localStorage.getItem('online'),
                  'success',
                  4000
                );
                this.router.navigateByUrl('/dashboard');
              })
              .catch((err) => {
                this._snackBar.openSnackBar(err, 'error', 10000);
              });
          }
          // console.log(data);
        },
        error: (err: any) => {
          console.log(err);
          this._snackBar.openSnackBar(err, 'error', 10000); //ใส่ snacbar
        },
      });
      this.submitted = false;
    }
  }

onPrevent(e: ClipboardEvent){
  e.preventDefault();
}
}
