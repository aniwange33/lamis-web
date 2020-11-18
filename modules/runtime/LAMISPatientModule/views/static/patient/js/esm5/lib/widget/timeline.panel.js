import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimelineEvent } from './timeline.event';
var TimelinePanel = /** @class */ (function () {
    function TimelinePanel(event) {
        this.event = event;
    }
    TimelinePanel.ctorParameters = function () { return [
        { type: TimelineEvent }
    ]; };
    TimelinePanel = tslib_1.__decorate([
        Component({
            selector: 'timeline-panel',
            template: "\n        <div class='timeline-panel'>\n            <ng-content></ng-content>\n        </div>"
        }),
        tslib_1.__metadata("design:paramtypes", [TimelineEvent])
    ], TimelinePanel);
    return TimelinePanel;
}());
export { TimelinePanel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUucGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFVL0M7SUFDSSx1QkFBb0IsS0FBb0I7UUFBcEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtJQUN4QyxDQUFDOztnQkFEMEIsYUFBYTs7SUFEL0IsYUFBYTtRQVJ6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFDSiwrRkFHTztTQUNkLENBQUM7aURBRTZCLGFBQWE7T0FEL0IsYUFBYSxDQUd6QjtJQUFELG9CQUFDO0NBQUEsQUFIRCxJQUdDO1NBSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGltZWxpbmVFdmVudH0gZnJvbSAnLi90aW1lbGluZS5ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZWxpbmUtcGFuZWwnLFxuICAgIHRlbXBsYXRlOlxuICAgICAgICBgXG4gICAgICAgIDxkaXYgY2xhc3M9J3RpbWVsaW5lLXBhbmVsJz5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZVBhbmVsIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50OiBUaW1lbGluZUV2ZW50KSB7XG4gICAgfVxufVxuIl19