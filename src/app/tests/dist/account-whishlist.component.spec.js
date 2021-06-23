"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var account_whishlist_component_1 = require("../components/account-whishlist.component");
describe('AccountWhishlistComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [account_whishlist_component_1.AccountWhishlistComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(account_whishlist_component_1.AccountWhishlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
