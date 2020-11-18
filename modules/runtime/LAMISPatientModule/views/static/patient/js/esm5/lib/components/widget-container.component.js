import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
var WidgetContainerComponent = /** @class */ (function () {
    function WidgetContainerComponent() {
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], WidgetContainerComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], WidgetContainerComponent.prototype, "icon", void 0);
    tslib_1.__decorate([
        ViewChild('container', { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], WidgetContainerComponent.prototype, "embeddedContainer", void 0);
    WidgetContainerComponent = tslib_1.__decorate([
        Component({
            selector: 'widget-container',
            template: "<mat-card class=\"dark-blue-100\">\n    <mat-card-header>\n        <mat-icon mat-card-avatar>{{icon || 'dashboard'}}</mat-icon>\n        <mat-card-title>{{title}}</mat-card-title>\n    </mat-card-header>\n    <mat-divider></mat-divider>\n    <mat-card-content>\n        <ng-container #container></ng-container>\n    </mat-card-content>\n</mat-card>\n",
            styles: ["mat-icon.mat-card-avatar{width:30px;height:30px;font-size:30px}mat-card-title{padding-top:5px!important}"]
        })
    ], WidgetContainerComponent);
    return WidgetContainerComponent;
}());
export { WidgetContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2lkZ2V0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWUsS0FBSyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU96RjtJQUFBO0lBUUEsQ0FBQztJQU5HO1FBREMsS0FBSyxFQUFFOzsyREFDTTtJQUVkO1FBREMsS0FBSyxFQUFFOzswREFDSztJQUdiO1FBREMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7MENBQzVDLGdCQUFnQjt1RUFBQztJQVAzQix3QkFBd0I7UUFMcEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QiwwV0FBZ0Q7O1NBRW5ELENBQUM7T0FDVyx3QkFBd0IsQ0FRcEM7SUFBRCwrQkFBQztDQUFBLEFBUkQsSUFRQztTQVJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd2lkZ2V0LWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dpZGdldC1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3dpZGdldC1jb250YWluZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXRDb250YWluZXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGljb246IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIGVtYmVkZGVkQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19