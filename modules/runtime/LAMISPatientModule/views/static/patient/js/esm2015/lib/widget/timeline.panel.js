import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {TimelineEvent} from './timeline.event';

let TimelinePanel = class TimelinePanel {
    constructor(event) {
        this.event = event;
    }
};
TimelinePanel.ctorParameters = () => [
    {type: TimelineEvent}
];
TimelinePanel = tslib_1.__decorate([
    Component({
        selector: 'timeline-panel',
        template: `
        <div class='timeline-panel'>
            <ng-content></ng-content>
        </div>`
    }),
    tslib_1.__metadata("design:paramtypes", [TimelineEvent])
], TimelinePanel);
export {TimelinePanel};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUucGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFVakQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN0QixZQUFvQixLQUFvQjtRQUFwQixVQUFLLEdBQUwsS0FBSyxDQUFlO0lBQ3hDLENBQUM7Q0FDSixDQUFBOztZQUY4QixhQUFhOztBQUQvQixhQUFhO0lBUnpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUNBOzs7ZUFHRztLQUNkLENBQUM7NkNBRTZCLGFBQWE7R0FEL0IsYUFBYSxDQUd6QjtTQUhZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVsaW5lRXZlbnQgfSBmcm9tICcuL3RpbWVsaW5lLmV2ZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0aW1lbGluZS1wYW5lbCcsXG4gICAgdGVtcGxhdGU6XG4gICAgICAgICAgICBgXG4gICAgICAgIDxkaXYgY2xhc3M9J3RpbWVsaW5lLXBhbmVsJz5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZVBhbmVsIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50OiBUaW1lbGluZUV2ZW50KSB7XG4gICAgfVxufVxuIl19
