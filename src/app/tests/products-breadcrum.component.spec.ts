import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBreadcrumComponent } from '../components/products-breadcrum.component';

describe('ProductsBreadcrumComponent', () => {
  let component: ProductsBreadcrumComponent;
  let fixture: ComponentFixture<ProductsBreadcrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsBreadcrumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
