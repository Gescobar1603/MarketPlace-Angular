"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var account_breadcrumb_component_1 = require("../components/account-breadcrumb.component");
describe('AccountBreadcrumbComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [account_breadcrumb_component_1.AccountBreadcrumbComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(account_breadcrumb_component_1.AccountBreadcrumbComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
