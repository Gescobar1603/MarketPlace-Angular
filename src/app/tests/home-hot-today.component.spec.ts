import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHotTodayComponent } from '../components/home-hot-today.component';

describe('HomeHotTodayComponent', () => {
  let component: HomeHotTodayComponent;
  let fixture: ComponentFixture<HomeHotTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHotTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHotTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
