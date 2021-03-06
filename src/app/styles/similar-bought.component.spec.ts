import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarBoughtComponent } from '../components/similar-bought.component';

describe('SimilarBoughtComponent', () => {
  let component: SimilarBoughtComponent;
  let fixture: ComponentFixture<SimilarBoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarBoughtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
