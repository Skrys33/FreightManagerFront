import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementInComponent } from './movement-in.component';

describe('MovementInComponent', () => {
  let component: MovementInComponent;
  let fixture: ComponentFixture<MovementInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovementInComponent]
    });
    fixture = TestBed.createComponent(MovementInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
