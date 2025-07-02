import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProducerComponent } from './landing-producer.component';

describe('LandingProducerComponent', () => {
  let component: LandingProducerComponent;
  let fixture: ComponentFixture<LandingProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingProducerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
