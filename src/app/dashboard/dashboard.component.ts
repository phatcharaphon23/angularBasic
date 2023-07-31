import { Component } from '@angular/core';
import { HttpService } from '../__service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  users: any;
  page: number = 1;

  constructor(private http: HttpService) {}

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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
