import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passrecover2 } from './passrecover2';

describe('Passrecover2', () => {
  let component: Passrecover2;
  let fixture: ComponentFixture<Passrecover2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passrecover2],
    }).compileComponents();

    fixture = TestBed.createComponent(Passrecover2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
