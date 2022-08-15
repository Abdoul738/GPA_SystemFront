import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListepatrimoinesComponent } from './listepatrimoines.component';

describe('ListepatrimoinesComponent', () => {
  let component: ListepatrimoinesComponent;
  let fixture: ComponentFixture<ListepatrimoinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListepatrimoinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListepatrimoinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
