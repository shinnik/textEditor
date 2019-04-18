import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTypeCodeComponent } from './block-type-code.component';

describe('BlockTypeCodeComponent', () => {
  let component: BlockTypeCodeComponent;
  let fixture: ComponentFixture<BlockTypeCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTypeCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTypeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
