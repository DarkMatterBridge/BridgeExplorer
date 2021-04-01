import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnodeSequenceComponent } from './bnode-sequence.component';

describe('BnodeSequenceComponent', () => {
  let component: BnodeSequenceComponent;
  let fixture: ComponentFixture<BnodeSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BnodeSequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BnodeSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
