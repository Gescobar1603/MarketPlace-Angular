import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePromotionComponent } from './home-promotion.component';

describe('HomePromotionComponent', () => {
  let component: HomePromotionComponent;
  let fixture: ComponentFixture<HomePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
