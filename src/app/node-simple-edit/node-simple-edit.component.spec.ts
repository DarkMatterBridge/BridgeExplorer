import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSimpleEditComponent } from './node-simple-edit.component';

describe('NodeSimpleEditComponent', () => {
  let component: NodeSimpleEditComponent;
  let fixture: ComponentFixture<NodeSimpleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeSimpleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSimpleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
