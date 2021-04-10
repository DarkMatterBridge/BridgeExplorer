import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinLoaderComponent } from './lin-loader.component';

describe('LinLoaderComponent', () => {
  let component: LinLoaderComponent;
  let fixture: ComponentFixture<LinLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
