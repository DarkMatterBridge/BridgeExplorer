import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingSequenceComponent } from './bidding-sequence.component';

describe('BiddingSequenceComponent', () => {
  let component: BiddingSequenceComponent;
  let fixture: ComponentFixture<BiddingSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingSequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
