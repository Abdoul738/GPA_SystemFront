import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpatrimoineComponent } from './addpatrimoine.component';

describe('AddpatrimoineComponent', () => {
  let component: AddpatrimoineComponent;
  let fixture: ComponentFixture<AddpatrimoineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpatrimoineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpatrimoineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
