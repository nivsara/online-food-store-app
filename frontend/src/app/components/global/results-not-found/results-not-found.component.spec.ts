import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsNotFoundComponent } from './results-not-found.component';

describe('ResultsNotFoundComponent', () => {
  let component: ResultsNotFoundComponent;
  let fixture: ComponentFixture<ResultsNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
