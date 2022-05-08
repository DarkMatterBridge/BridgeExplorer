import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSequencesComponent } from './bid-sequences.component';

describe('BidListComponent', () => {
  let component: BidSequencesComponent;
  let fixture: ComponentFixture<BidSequencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidSequencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
