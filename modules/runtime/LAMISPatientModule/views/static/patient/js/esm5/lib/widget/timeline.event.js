import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimelineWidget } from './timeline.widget';
var TimelineEvent = /** @class */ (function () {
    function TimelineEvent(parent) {
        this.parent = parent;
        this._side = 'left';
    }
    Object.defineProperty(TimelineEvent.prototype, "side", {
        set: function (side) {
            this._side = side;
            this.updateRowClasses(this._side);
        },
        enumerable: true,
        configurable: true
    });
    TimelineEvent.prototype.ngOnInit = function () {
        this.updateRowClasses(this._side);
    };
    TimelineEvent.prototype.checkClass = function (side, leftSide) {
        var leftClass = '';
        var rightClass = 'timeline-inverted';
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
    };
    TimelineEvent.prototype.updateRowClasses = function (value) {
        this.oddClass = this.checkClass(value, true);
        this.evenClass = this.checkClass(value, false);
    };
    TimelineEvent.ctorParameters = function () { return [
        { type: TimelineWidget }
    ]; };
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
    return TimelineEvent;
}());
export { TimelineEvent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuZXZlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBTWpEO0lBV0ksdUJBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBUDFDLFVBQUssR0FBVyxNQUFNLENBQUM7SUFRdkIsQ0FBQztJQU5ELHNCQUFJLCtCQUFJO2FBQVIsVUFBUyxJQUFZO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFLRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLElBQUksRUFBRSxRQUFRO1FBQ3JCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztRQUVyQyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDakQsT0FBTyxTQUFTLENBQUM7U0FDcEI7YUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDOUQsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDOztnQkF6QjJCLGNBQWM7O0lBTDFDO1FBREMsS0FBSyxFQUFFOzs7NkNBSVA7SUFUUSxhQUFhO1FBSnpCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsdUlBQW9DO1NBQ3ZDLENBQUM7aURBWThCLGNBQWM7T0FYakMsYUFBYSxDQXFDekI7SUFBRCxvQkFBQztDQUFBLEFBckNELElBcUNDO1NBckNZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RpbWVsaW5lV2lkZ2V0fSBmcm9tICcuL3RpbWVsaW5lLndpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZWxpbmUtZXZlbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lbGluZS5ldmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUV2ZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG9kZENsYXNzO1xuICAgIGV2ZW5DbGFzcztcbiAgICBfc2lkZTogc3RyaW5nID0gJ2xlZnQnO1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNpZGUoc2lkZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3NpZGUgPSBzaWRlO1xuICAgICAgICB0aGlzLnVwZGF0ZVJvd0NsYXNzZXModGhpcy5fc2lkZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJlbnQ6IFRpbWVsaW5lV2lkZ2V0KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlUm93Q2xhc3Nlcyh0aGlzLl9zaWRlKTtcbiAgICB9XG5cbiAgICBjaGVja0NsYXNzKHNpZGUsIGxlZnRTaWRlKSB7XG4gICAgICAgIGxldCBsZWZ0Q2xhc3MgPSAnJztcbiAgICAgICAgbGV0IHJpZ2h0Q2xhc3MgPSAndGltZWxpbmUtaW52ZXJ0ZWQnO1xuXG4gICAgICAgIGlmIChzaWRlID09PSAnbGVmdCcgfHwgKCFzaWRlICYmIGxlZnRTaWRlID09PSB0cnVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxlZnRDbGFzcztcbiAgICAgICAgfSBlbHNlIGlmICgoc2lkZSA9PT0gJ2FsdGVybmF0ZScgfHwgIXNpZGUpICYmIGxlZnRTaWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0Q2xhc3M7XG4gICAgICAgIH0gZWxzZSBpZiAoc2lkZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0Q2xhc3M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGVmdENsYXNzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUm93Q2xhc3Nlcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9kZENsYXNzID0gdGhpcy5jaGVja0NsYXNzKHZhbHVlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ldmVuQ2xhc3MgPSB0aGlzLmNoZWNrQ2xhc3ModmFsdWUsIGZhbHNlKTtcbiAgICB9XG59XG4iXX0=