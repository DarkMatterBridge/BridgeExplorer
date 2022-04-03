import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidLineComponent } from './bid-line.component';

describe('BidLineComponent', () => {
  let component: BidLineComponent;
  let fixture: ComponentFixture<BidLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
