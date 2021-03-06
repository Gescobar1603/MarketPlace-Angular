import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBreadcrumbComponent } from '../components/product-breadcrumb.component';

describe('ProductBreadcrumbComponent', () => {
  let component: ProductBreadcrumbComponent;
  let fixture: ComponentFixture<ProductBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
