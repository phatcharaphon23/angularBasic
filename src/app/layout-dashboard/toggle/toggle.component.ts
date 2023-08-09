import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  constructor(private router:Router){}

  // constructor(private dialog: MatDialog){}
  onClose(){
    localStorage.setItem('toggle', 'N')

  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  // onChangPassword(){

  // }

}
