import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingButtonComponent } from './adding-button.component';

describe('AddingButtonComponent', () => {
  let component: AddingButtonComponent;
  let fixture: ComponentFixture<AddingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
