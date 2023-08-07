import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent  {
  username : string = '';

  users: any;
  editUser: boolean = false;
  submitted: boolean = false;

  form = new FormGroup({
    // username: new FormControl('', [Validators.minLength(1)]),
    id: new FormControl({ value: '', disabled: true }),
    username: new FormControl('', [Validators.minLength(1)]),
    password: new FormControl('', [Validators.minLength(1)]),
  });

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
}

