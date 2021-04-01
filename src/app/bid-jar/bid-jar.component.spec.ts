import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidJarComponent } from './bid-jar.component';

describe('BidJarComponent', () => {
  let component: BidJarComponent;
  let fixture: ComponentFixture<BidJarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidJarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidJarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
