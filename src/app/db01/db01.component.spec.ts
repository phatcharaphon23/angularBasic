import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Db01Component } from './db01.component';

describe('Db01Component', () => {
  let component: Db01Component;
  let fixture: ComponentFixture<Db01Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Db01Component]
    });
    fixture = TestBed.createComponent(Db01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
