import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingboxComponent } from './biddingbox.component';

describe('BiddingboxComponent', () => {
  let component: BiddingboxComponent;
  let fixture: ComponentFixture<BiddingboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
