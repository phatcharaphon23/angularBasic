import { Component, HostListener } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public innectwidth: any;

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {
    localStorage.setItem('toggle', 'N')
    this.innectwidth = window.innerWidth;
  }

  // @HostListener('window:resize', ['$event'])

  openMenuToggle() {
    if (localStorage.getItem('toggle') == 'N') {
      localStorage.setItem('toggle','Y' );
      this.dialog.open(ToggleComponent, {
        width: '260px',
        position: { top: '10px' },
        hasBackdrop: false
      
    });
  }else {
    this.dialog.closeAll();
    localStorage.setItem('toggle', 'N');
  }


  }
  @HostListener('window:resize', ['$event'])
  onResize(){
    this.innectwidth = window.innerWidth;
    if(
      this.innectwidth >= 770
    ){
      localStorage.setItem('toggle', 'N');
      this.dialog.closeAll();
    }
  }

}
