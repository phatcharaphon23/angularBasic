import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
constructor(private router:Router){}

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
