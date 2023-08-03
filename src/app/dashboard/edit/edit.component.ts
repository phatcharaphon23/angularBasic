import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  //Update 
  form = new FormGroup({
    username: new FormControl('', [Validators.minLength(1)]),
    password: new FormControl('', [Validators.minLength(1)]),
  });
  @Input() set user(value: any) {
    if (value) {
      this.form.patchValue({
        username: value.username,
        password: value.password
      })
    }
  }

  @Output() controls = new EventEmitter();

  ngOnInit(): void {}

  onClose() {
    this.controls.emit({
      control: 'close',
    });
  }
}
