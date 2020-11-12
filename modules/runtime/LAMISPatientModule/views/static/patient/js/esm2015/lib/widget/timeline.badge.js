import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {TimelineEvent} from './timeline.event';

let TimelineBadge = class TimelineBadge {
    constructor(event) {
        this.event = event;
    }
};
TimelineBadge.ctorParameters = () => [
    {type: TimelineEvent}
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
export {TimelineBadge};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuYmFkZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5iYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFVakQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN0QixZQUFvQixLQUFvQjtRQUFwQixVQUFLLEdBQUwsS0FBSyxDQUFlO0lBQ3hDLENBQUM7Q0FDSixDQUFBOztZQUY4QixhQUFhOztBQUQvQixhQUFhO0lBUnpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUFFOzs7O0tBSVQ7S0FDSixDQUFDOzZDQUU2QixhQUFhO0dBRC9CLGFBQWEsQ0FHekI7U0FIWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lbGluZUV2ZW50IH0gZnJvbSAnLi90aW1lbGluZS5ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZWxpbmUtYmFkZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9J3RpbWVsaW5lLWJhZGdlJz5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUJhZGdlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50OiBUaW1lbGluZUV2ZW50KSB7XG4gICAgfVxufVxuIl19
