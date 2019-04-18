import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTextStyleBarComponent } from './editor-text-style-bar.component';

describe('EditorTextStyleBarComponent', () => {
  let component: EditorTextStyleBarComponent;
  let fixture: ComponentFixture<EditorTextStyleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTextStyleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTextStyleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
