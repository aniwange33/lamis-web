import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimelineEvent } from './timeline.event';
let TimelineBadge = class TimelineBadge {
    constructor(event) {
        this.event = event;
    }
};
TimelineBadge.ctorParameters = () => [
    { type: TimelineEvent }
];
TimelineBadge = tslib_1.__decorate([
    Component({
        selector: 'timeline-badge',
        template: `
        <div class='timeline-badge'>
            <ng-content></ng-content>
        </div>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [TimelineEvent])
], TimelineBadge);
export { TimelineBadge };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuYmFkZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5iYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFVL0MsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN0QixZQUFvQixLQUFvQjtRQUFwQixVQUFLLEdBQUwsS0FBSyxDQUFlO0lBQ3hDLENBQUM7Q0FDSixDQUFBOztZQUY4QixhQUFhOztBQUQvQixhQUFhO0lBUnpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUFFOzs7O0tBSVQ7S0FDSixDQUFDOzZDQUU2QixhQUFhO0dBRC9CLGFBQWEsQ0FHekI7U0FIWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lbGluZUV2ZW50fSBmcm9tICcuL3RpbWVsaW5lLmV2ZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0aW1lbGluZS1iYWRnZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz0ndGltZWxpbmUtYmFkZ2UnPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQmFkZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnQ6IFRpbWVsaW5lRXZlbnQpIHtcbiAgICB9XG59XG4iXX0=