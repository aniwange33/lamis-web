import * as tslib_1 from "tslib";
import {Component, Input} from '@angular/core';
import {TimelineWidget} from './timeline.widget';

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
        } else if ((side === 'alternate' || !side) && leftSide === false) {
            return rightClass;
        } else if (side === 'right') {
            return rightClass;
        } else {
            return leftClass;
        }
    }

    updateRowClasses(value) {
        this.oddClass = this.checkClass(value, true);
        this.evenClass = this.checkClass(value, false);
    }
};
TimelineEvent.ctorParameters = () => [
    {type: TimelineWidget}
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
export {TimelineEvent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuZXZlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTW5ELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFXdEIsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFQMUMsVUFBSyxHQUFXLE1BQU0sQ0FBQztJQVF2QixDQUFDO0lBTkQsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFLRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFRO1FBQ3JCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztRQUVyQyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDakQsT0FBTyxTQUFTLENBQUM7U0FDcEI7YUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDOUQsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsT0FBTyxVQUFVLENBQUM7U0FDckI7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQUs7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSixDQUFBOztZQTFCK0IsY0FBYzs7QUFMMUM7SUFEQyxLQUFLLEVBQUU7Ozt5Q0FJUDtBQVRRLGFBQWE7SUFKekIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQix1SUFBb0M7S0FDdkMsQ0FBQzs2Q0FZOEIsY0FBYztHQVhqQyxhQUFhLENBcUN6QjtTQXJDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lbGluZVdpZGdldCB9IGZyb20gJy4vdGltZWxpbmUud2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0aW1lbGluZS1ldmVudCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLmV2ZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lRXZlbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgb2RkQ2xhc3M7XG4gICAgZXZlbkNsYXNzO1xuICAgIF9zaWRlOiBzdHJpbmcgPSAnbGVmdCc7XG4gICAgQElucHV0KClcbiAgICBzZXQgc2lkZShzaWRlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc2lkZSA9IHNpZGU7XG4gICAgICAgIHRoaXMudXBkYXRlUm93Q2xhc3Nlcyh0aGlzLl9zaWRlKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJlbnQ6IFRpbWVsaW5lV2lkZ2V0KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlUm93Q2xhc3Nlcyh0aGlzLl9zaWRlKTtcbiAgICB9XG5cbiAgICBjaGVja0NsYXNzKHNpZGUsIGxlZnRTaWRlKSB7XG4gICAgICAgIGxldCBsZWZ0Q2xhc3MgPSAnJztcbiAgICAgICAgbGV0IHJpZ2h0Q2xhc3MgPSAndGltZWxpbmUtaW52ZXJ0ZWQnO1xuXG4gICAgICAgIGlmIChzaWRlID09PSAnbGVmdCcgfHwgKCFzaWRlICYmIGxlZnRTaWRlID09PSB0cnVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxlZnRDbGFzcztcbiAgICAgICAgfSBlbHNlIGlmICgoc2lkZSA9PT0gJ2FsdGVybmF0ZScgfHwgIXNpZGUpICYmIGxlZnRTaWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0Q2xhc3M7XG4gICAgICAgIH0gZWxzZSBpZiAoc2lkZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0Q2xhc3M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGVmdENsYXNzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUm93Q2xhc3Nlcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9kZENsYXNzID0gdGhpcy5jaGVja0NsYXNzKHZhbHVlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ldmVuQ2xhc3MgPSB0aGlzLmNoZWNrQ2xhc3ModmFsdWUsIGZhbHNlKTtcbiAgICB9XG59XG4iXX0=
