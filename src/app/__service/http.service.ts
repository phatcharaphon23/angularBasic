import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  async AUTH(BODY: any) {
    return await new Promise((resolve, reject) => {
      let options = {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      };

      this.httpClient.post('/auth/auth', BODY, options).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.success) {
            // console.log('SERVICE ' + data.message);
            resolve(data.messege);
          } else {
            reject(data.messege);
          }
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  async POST(URL: string, BODY: any) {
    return new Promise((resolve, reject) => {
      let options = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json; charset=utf-8')
          .set(
            'Authorization',
            localStorage.getItem('token_type') +
              ' ' +
              localStorage.getItem('token')
          ),
      };
      this.httpClient.post(URL, BODY, options).subscribe({
        next: (data: any) => {
          // console.log(data)
          if (data.success) {
            resolve(data.messege);
            // console.log(data.messege);
          } else {
            reject(data.messege);
          }
          // console.log(data);
        },
        error: (err: any) => {
          reject(err);
          // console.log(err);
        },
      });
    });
  }
}
