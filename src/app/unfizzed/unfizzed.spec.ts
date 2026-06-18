import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unfizzed } from './unfizzed';

describe('Unfizzed', () => {
  let component: Unfizzed;
  let fixture: ComponentFixture<Unfizzed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unfizzed],
    }).compileComponents();

    fixture = TestBed.createComponent(Unfizzed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
