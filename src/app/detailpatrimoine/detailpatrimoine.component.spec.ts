import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpatrimoineComponent } from './detailpatrimoine.component';

describe('DetailpatrimoineComponent', () => {
  let component: DetailpatrimoineComponent;
  let fixture: ComponentFixture<DetailpatrimoineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailpatrimoineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpatrimoineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
