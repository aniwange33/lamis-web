import * as tslib_1 from "tslib";
import {Component, Input} from '@angular/core';
import {TimelineWidget} from './timeline.widget';

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
        } else if ((side === 'alternate' || !side) && leftSide === false) {
            return rightClass;
        } else if (side === 'right') {
            return rightClass;
        } else {
            return leftClass;
        }
    };
    TimelineEvent.prototype.updateRowClasses = function (value) {
        this.oddClass = this.checkClass(value, true);
        this.evenClass = this.checkClass(value, false);
    };
    TimelineEvent.ctorParameters = function () {
        return [
            {type: TimelineWidget}
        ];
    };
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
export {TimelineEvent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuZXZlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTW5EO0lBV0ksdUJBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBUDFDLFVBQUssR0FBVyxNQUFNLENBQUM7SUFRdkIsQ0FBQztJQU5ELHNCQUFJLCtCQUFJO2FBQVIsVUFBUyxJQUFZO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFLRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLElBQUksRUFBRSxRQUFRO1FBQ3JCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztRQUVyQyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDakQsT0FBTyxTQUFTLENBQUM7U0FDcEI7YUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDOUQsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDOztnQkF6QjJCLGNBQWM7O0lBTDFDO1FBREMsS0FBSyxFQUFFOzs7NkNBSVA7SUFUUSxhQUFhO1FBSnpCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsdUlBQW9DO1NBQ3ZDLENBQUM7aURBWThCLGNBQWM7T0FYakMsYUFBYSxDQXFDekI7SUFBRCxvQkFBQztDQUFBLEFBckNELElBcUNDO1NBckNZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVsaW5lV2lkZ2V0IH0gZnJvbSAnLi90aW1lbGluZS53aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RpbWVsaW5lLWV2ZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUuZXZlbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVFdmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBvZGRDbGFzcztcbiAgICBldmVuQ2xhc3M7XG4gICAgX3NpZGU6IHN0cmluZyA9ICdsZWZ0JztcbiAgICBASW5wdXQoKVxuICAgIHNldCBzaWRlKHNpZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zaWRlID0gc2lkZTtcbiAgICAgICAgdGhpcy51cGRhdGVSb3dDbGFzc2VzKHRoaXMuX3NpZGUpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmVudDogVGltZWxpbmVXaWRnZXQpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVSb3dDbGFzc2VzKHRoaXMuX3NpZGUpO1xuICAgIH1cblxuICAgIGNoZWNrQ2xhc3Moc2lkZSwgbGVmdFNpZGUpIHtcbiAgICAgICAgbGV0IGxlZnRDbGFzcyA9ICcnO1xuICAgICAgICBsZXQgcmlnaHRDbGFzcyA9ICd0aW1lbGluZS1pbnZlcnRlZCc7XG5cbiAgICAgICAgaWYgKHNpZGUgPT09ICdsZWZ0JyB8fCAoIXNpZGUgJiYgbGVmdFNpZGUgPT09IHRydWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGVmdENsYXNzO1xuICAgICAgICB9IGVsc2UgaWYgKChzaWRlID09PSAnYWx0ZXJuYXRlJyB8fCAhc2lkZSkgJiYgbGVmdFNpZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmlnaHRDbGFzcztcbiAgICAgICAgfSBlbHNlIGlmIChzaWRlID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmlnaHRDbGFzcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0Q2xhc3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVSb3dDbGFzc2VzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub2RkQ2xhc3MgPSB0aGlzLmNoZWNrQ2xhc3ModmFsdWUsIHRydWUpO1xuICAgICAgICB0aGlzLmV2ZW5DbGFzcyA9IHRoaXMuY2hlY2tDbGFzcyh2YWx1ZSwgZmFsc2UpO1xuICAgIH1cbn1cbiJdfQ==
