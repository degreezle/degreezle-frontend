import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experiment3Component } from './experiment3.component';

describe('Experiment3Component', () => {
  let component: Experiment3Component;
  let fixture: ComponentFixture<Experiment3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Experiment3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Experiment3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
