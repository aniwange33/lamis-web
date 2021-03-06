import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { TimelineWidget } from './timeline.widget';
import { TimelineEvent } from './timeline.event';
import { TimelineBadge } from './timeline.badge';
import { TimelineFooter } from './timeline.footer';
import { TimelineHeader } from './timeline.header';
import { TimelinePanel } from './timeline.panel';
var COMPONENTS = [TimelineBadge, TimelineEvent, TimelineFooter, TimelineHeader, TimelinePanel, TimelineWidget];
var TimelineWidgetModule = /** @class */ (function () {
    function TimelineWidgetModule() {
    }
    TimelineWidgetModule = tslib_1.__decorate([
        NgModule({
            declarations: tslib_1.__spread(COMPONENTS),
            exports: tslib_1.__spread(COMPONENTS)
        })
    ], TimelineWidgetModule);
    return TimelineWidgetModule;
}());
export { TimelineWidgetModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUud2lkZ2V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS40LjEvIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0L3RpbWVsaW5lLndpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBVWpIO0lBQUE7SUFFQSxDQUFDO0lBRlksb0JBQW9CO1FBUmhDLFFBQVEsQ0FBQztZQUNOLFlBQVksbUJBQ0wsVUFBVSxDQUNoQjtZQUNELE9BQU8sbUJBQ0EsVUFBVSxDQUNoQjtTQUNKLENBQUM7T0FDVyxvQkFBb0IsQ0FFaEM7SUFBRCwyQkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lbGluZVdpZGdldH0gZnJvbSAnLi90aW1lbGluZS53aWRnZXQnO1xuaW1wb3J0IHtUaW1lbGluZUV2ZW50fSBmcm9tICcuL3RpbWVsaW5lLmV2ZW50JztcbmltcG9ydCB7VGltZWxpbmVCYWRnZX0gZnJvbSAnLi90aW1lbGluZS5iYWRnZSc7XG5pbXBvcnQge1RpbWVsaW5lRm9vdGVyfSBmcm9tICcuL3RpbWVsaW5lLmZvb3Rlcic7XG5pbXBvcnQge1RpbWVsaW5lSGVhZGVyfSBmcm9tICcuL3RpbWVsaW5lLmhlYWRlcic7XG5pbXBvcnQge1RpbWVsaW5lUGFuZWx9IGZyb20gJy4vdGltZWxpbmUucGFuZWwnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1RpbWVsaW5lQmFkZ2UsIFRpbWVsaW5lRXZlbnQsIFRpbWVsaW5lRm9vdGVyLCBUaW1lbGluZUhlYWRlciwgVGltZWxpbmVQYW5lbCwgVGltZWxpbmVXaWRnZXRdO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICAuLi5DT01QT05FTlRTXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIC4uLkNPTVBPTkVOVFNcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lV2lkZ2V0TW9kdWxlIHtcblxufVxuIl19