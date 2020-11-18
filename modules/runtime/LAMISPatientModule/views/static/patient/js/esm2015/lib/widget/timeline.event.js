import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimelineWidget } from './timeline.widget';
let TimelineEvent = class TimelineEvent {
    constructor(parent) {
        this.parent = parent;
        this._side = 'left';
    }
    set side(side) {
        this._side = side;
        this.updateRowClasses(this._side);
    }
    ngOnInit() {
        this.updateRowClasses(this._side);
    }
    checkClass(side, leftSide) {
        let leftClass = '';
        let rightClass = 'timeline-inverted';
        if (side === 'left' || (!side && leftSide === true)) {
            return leftClass;
        }
        else if ((side === 'alternate' || !side) && leftSide === false) {
            return rightClass;
        }
        else if (side === 'right') {
            return rightClass;
        }
        else {
            return leftClass;
        }
    }
    updateRowClasses(value) {
        this.oddClass = this.checkClass(value, true);
        this.evenClass = this.checkClass(value, false);
    }
};
TimelineEvent.ctorParameters = () => [
    { type: TimelineWidget }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], TimelineEvent.prototype, "side", null);
TimelineEvent = tslib_1.__decorate([
    Component({
        selector: 'timeline-event',
        template: "<li class=\"timeline-event\" ng-class-odd=\"oddClass\" ng-class-even=\"evenClass\">\n    <ng-content></ng-content>\n</li>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [TimelineWidget])
], TimelineEvent);
export { TimelineEvent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuZXZlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBTWpELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFXdEIsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFQMUMsVUFBSyxHQUFXLE1BQU0sQ0FBQztJQVF2QixDQUFDO0lBTkQsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFLRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFRO1FBQ3JCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztRQUVyQyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDakQsT0FBTyxTQUFTLENBQUM7U0FDcEI7YUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDOUQsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQUs7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSixDQUFBOztZQTFCK0IsY0FBYzs7QUFMMUM7SUFEQyxLQUFLLEVBQUU7Ozt5Q0FJUDtBQVRRLGFBQWE7SUFKekIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQix1SUFBb0M7S0FDdkMsQ0FBQzs2Q0FZOEIsY0FBYztHQVhqQyxhQUFhLENBcUN6QjtTQXJDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lbGluZVdpZGdldH0gZnJvbSAnLi90aW1lbGluZS53aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RpbWVsaW5lLWV2ZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUuZXZlbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVFdmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBvZGRDbGFzcztcbiAgICBldmVuQ2xhc3M7XG4gICAgX3NpZGU6IHN0cmluZyA9ICdsZWZ0JztcbiAgICBASW5wdXQoKVxuICAgIHNldCBzaWRlKHNpZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zaWRlID0gc2lkZTtcbiAgICAgICAgdGhpcy51cGRhdGVSb3dDbGFzc2VzKHRoaXMuX3NpZGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyZW50OiBUaW1lbGluZVdpZGdldCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVJvd0NsYXNzZXModGhpcy5fc2lkZSk7XG4gICAgfVxuXG4gICAgY2hlY2tDbGFzcyhzaWRlLCBsZWZ0U2lkZSkge1xuICAgICAgICBsZXQgbGVmdENsYXNzID0gJyc7XG4gICAgICAgIGxldCByaWdodENsYXNzID0gJ3RpbWVsaW5lLWludmVydGVkJztcblxuICAgICAgICBpZiAoc2lkZSA9PT0gJ2xlZnQnIHx8ICghc2lkZSAmJiBsZWZ0U2lkZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0Q2xhc3M7XG4gICAgICAgIH0gZWxzZSBpZiAoKHNpZGUgPT09ICdhbHRlcm5hdGUnIHx8ICFzaWRlKSAmJiBsZWZ0U2lkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByaWdodENsYXNzO1xuICAgICAgICB9IGVsc2UgaWYgKHNpZGUgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIHJldHVybiByaWdodENsYXNzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGxlZnRDbGFzcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVJvd0NsYXNzZXModmFsdWUpIHtcbiAgICAgICAgdGhpcy5vZGRDbGFzcyA9IHRoaXMuY2hlY2tDbGFzcyh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZXZlbkNsYXNzID0gdGhpcy5jaGVja0NsYXNzKHZhbHVlLCBmYWxzZSk7XG4gICAgfVxufVxuIl19