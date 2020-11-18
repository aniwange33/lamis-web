import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimelineEvent } from './timeline.event';
let TimelinePanel = class TimelinePanel {
    constructor(event) {
        this.event = event;
    }
};
TimelinePanel.ctorParameters = () => [
    { type: TimelineEvent }
];
TimelinePanel = tslib_1.__decorate([
    Component({
        selector: 'timeline-panel',
        template: `
        <div class='timeline-panel'>
            <ng-content></ng-content>
        </div>`
    }),
    tslib_1.__metadata("design:paramtypes", [TimelineEvent])
], TimelinePanel);
export { TimelinePanel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUucGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC90aW1lbGluZS5wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFVL0MsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN0QixZQUFvQixLQUFvQjtRQUFwQixVQUFLLEdBQUwsS0FBSyxDQUFlO0lBQ3hDLENBQUM7Q0FDSixDQUFBOztZQUY4QixhQUFhOztBQUQvQixhQUFhO0lBUnpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUNKOzs7ZUFHTztLQUNkLENBQUM7NkNBRTZCLGFBQWE7R0FEL0IsYUFBYSxDQUd6QjtTQUhZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RpbWVsaW5lRXZlbnR9IGZyb20gJy4vdGltZWxpbmUuZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RpbWVsaW5lLXBhbmVsJyxcbiAgICB0ZW1wbGF0ZTpcbiAgICAgICAgYFxuICAgICAgICA8ZGl2IGNsYXNzPSd0aW1lbGluZS1wYW5lbCc+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVQYW5lbCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudDogVGltZWxpbmVFdmVudCkge1xuICAgIH1cbn1cbiJdfQ==