import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[_username]'
})
export class UsernameDirective {

  
  regex = /[^a-zA-Z.0-9_@-]/;

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent){
    if(RegExp(this.regex).test(e.key)) {
    return true;

    } else{
      e.preventDefault();
      return false;
    }
  }

}
@Directive({
  selector: '[_password]',
})
export class PasswordDirective {

  // กรองช่อง username
  // regex = new RegExp('[^a-zA-Z.0-9_@#$%^&*()_-+=\[\]{};:\\|,.<>\/?]');
  // regex = /[a-zA-Z.0-9!@#$%^&*()_-+=\[\]{};:\\|,.<>/?]/;
  regex = /[a-zA-Z.0-9!@#$%^&*()_+-=\[\]{};:\\|,.<>/?]/;
  

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent){
    if(RegExp(this.regex).test(e.key)) {
    return true;

    } else{
      e.preventDefault();
      return false;
    }
  }

}
