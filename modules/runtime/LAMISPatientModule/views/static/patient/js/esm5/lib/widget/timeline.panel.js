import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {TimelineEvent} from './timeline.event';

var TimelinePanel = /** @class */ (function () {
    function TimelinePanel(event) {
        this.event = event;
    }

    TimelinePanel.ctorParameters = function () {
        return [
            {type: TimelineEvent}
        ];
    };
    TimelinePanel = tslib_1.__decorate([
        Component({
            selector: 'timeline-panel',
            template: "\n        <div class='timeline-panel'>\n            <ng-content></ng-content>\n        </div>"
        }),
        tslib_1.__metadata("design:paramtypes", [TimelineEvent])
    ], TimelinePanel);
    return TimelinePanel;
}());
export {TimelinePanel};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUucGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFVakQ7SUFDSSx1QkFBb0IsS0FBb0I7UUFBcEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtJQUN4QyxDQUFDOztnQkFEMEIsYUFBYTs7SUFEL0IsYUFBYTtRQVJ6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFDQSwrRkFHRztTQUNkLENBQUM7aURBRTZCLGFBQWE7T0FEL0IsYUFBYSxDQUd6QjtJQUFELG9CQUFDO0NBQUEsQUFIRCxJQUdDO1NBSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZWxpbmVFdmVudCB9IGZyb20gJy4vdGltZWxpbmUuZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RpbWVsaW5lLXBhbmVsJyxcbiAgICB0ZW1wbGF0ZTpcbiAgICAgICAgICAgIGBcbiAgICAgICAgPGRpdiBjbGFzcz0ndGltZWxpbmUtcGFuZWwnPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lUGFuZWwge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnQ6IFRpbWVsaW5lRXZlbnQpIHtcbiAgICB9XG59XG4iXX0=
