import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTypeHeaderComponent } from './block-type-header.component';

describe('BlockTypeHeaderComponent', () => {
  let component: BlockTypeHeaderComponent;
  let fixture: ComponentFixture<BlockTypeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTypeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTypeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
