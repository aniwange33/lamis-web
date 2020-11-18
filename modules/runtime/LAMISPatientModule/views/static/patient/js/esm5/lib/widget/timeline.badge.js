import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimelineEvent } from './timeline.event';
var TimelineBadge = /** @class */ (function () {
    function TimelineBadge(event) {
        this.event = event;
    }
    TimelineBadge.ctorParameters = function () { return [
        { type: TimelineEvent }
    ]; };
    TimelineBadge = tslib_1.__decorate([
        Component({
            selector: 'timeline-badge',
            template: "\n        <div class='timeline-badge'>\n            <ng-content></ng-content>\n        </div>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [TimelineEvent])
    ], TimelineBadge);
    return TimelineBadge;
}());
export { TimelineBadge };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuYmFkZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5iYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFVL0M7SUFDSSx1QkFBb0IsS0FBb0I7UUFBcEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtJQUN4QyxDQUFDOztnQkFEMEIsYUFBYTs7SUFEL0IsYUFBYTtRQVJ6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxxR0FJVDtTQUNKLENBQUM7aURBRTZCLGFBQWE7T0FEL0IsYUFBYSxDQUd6QjtJQUFELG9CQUFDO0NBQUEsQUFIRCxJQUdDO1NBSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGltZWxpbmVFdmVudH0gZnJvbSAnLi90aW1lbGluZS5ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZWxpbmUtYmFkZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9J3RpbWVsaW5lLWJhZGdlJz5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUJhZGdlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50OiBUaW1lbGluZUV2ZW50KSB7XG4gICAgfVxufVxuIl19