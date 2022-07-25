import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionMetricsModalComponent } from './solution-metrics-modal.component';

describe('SolutionMetricsModalComponent', () => {
  let component: SolutionMetricsModalComponent;
  let fixture: ComponentFixture<SolutionMetricsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionMetricsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionMetricsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
