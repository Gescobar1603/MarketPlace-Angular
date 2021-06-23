import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWhishlistComponent } from '../components/account-whishlist.component';

describe('AccountWhishlistComponent', () => {
  let component: AccountWhishlistComponent;
  let fixture: ComponentFixture<AccountWhishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountWhishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountWhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
