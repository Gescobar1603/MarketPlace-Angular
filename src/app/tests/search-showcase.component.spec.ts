import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShowcaseComponent } from '../components/search-showcase.component';

describe('SearchShowcaseComponent', () => {
  let component: SearchShowcaseComponent;
  let fixture: ComponentFixture<SearchShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
