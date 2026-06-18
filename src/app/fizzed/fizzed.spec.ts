import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fizzed } from './fizzed';

describe('Fizzed', () => {
  let component: Fizzed;
  let fixture: ComponentFixture<Fizzed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fizzed],
    }).compileComponents();

    fixture = TestBed.createComponent(Fizzed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
