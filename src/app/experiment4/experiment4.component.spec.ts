import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experiment4Component } from './experiment4.component';

describe('Experiment4Component', () => {
  let component: Experiment4Component;
  let fixture: ComponentFixture<Experiment4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Experiment4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Experiment4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
