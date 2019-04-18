import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderBlockComponent } from './render-block.component';

describe('RenderBlockComponent', () => {
  let component: RenderBlockComponent;
  let fixture: ComponentFixture<RenderBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
