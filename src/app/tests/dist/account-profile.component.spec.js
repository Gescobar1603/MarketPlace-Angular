"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var account_profile_component_1 = require("../components/account-profile.component");
describe('AccountProfileComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [account_profile_component_1.AccountProfileComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(account_profile_component_1.AccountProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
