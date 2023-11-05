import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclareMovementComponent } from './declare-movement.component';

describe('DeclareMovementComponent', () => {
  let component: DeclareMovementComponent;
  let fixture: ComponentFixture<DeclareMovementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclareMovementComponent]
    });
    fixture = TestBed.createComponent(DeclareMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
