import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopCategoriasComponent } from '../components/home-top-categorias.component';

describe('HomeTopCategoriasComponent', () => {
  let component: HomeTopCategoriasComponent;
  let fixture: ComponentFixture<HomeTopCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTopCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTopCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
