import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {TimelineEvent} from './timeline.event';

var TimelineBadge = /** @class */ (function () {
    function TimelineBadge(event) {
        this.event = event;
    }

    TimelineBadge.ctorParameters = function () {
        return [
            {type: TimelineEvent}
        ];
    };
    TimelineBadge = tslib_1.__decorate([
        Component({
            selector: 'timeline-badge',
            template: "\n        <div class='timeline-badge'>\n            <ng-content></ng-content>\n        </div>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [TimelineEvent])
    ], TimelineBadge);
    return TimelineBadge;
}());
export {TimelineBadge};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuYmFkZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5iYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFVakQ7SUFDSSx1QkFBb0IsS0FBb0I7UUFBcEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtJQUN4QyxDQUFDOztnQkFEMEIsYUFBYTs7SUFEL0IsYUFBYTtRQVJ6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxxR0FJVDtTQUNKLENBQUM7aURBRTZCLGFBQWE7T0FEL0IsYUFBYSxDQUd6QjtJQUFELG9CQUFDO0NBQUEsQUFIRCxJQUdDO1NBSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZWxpbmVFdmVudCB9IGZyb20gJy4vdGltZWxpbmUuZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RpbWVsaW5lLWJhZGdlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPSd0aW1lbGluZS1iYWRnZSc+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVCYWRnZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudDogVGltZWxpbmVFdmVudCkge1xuICAgIH1cbn1cbiJdfQ==
