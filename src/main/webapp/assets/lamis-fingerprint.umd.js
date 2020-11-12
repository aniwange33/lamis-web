(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('sockjs-client'), require('webstomp-client'), require('@angular/core'), require('@angular/material'), require('@angular/flex-layout'), require('@angular/common'), require('@stomp/ng2-stompjs'), require('@angular/platform-browser'), require('@angular/router')) :
        typeof define === 'function' && define.amd ? define('lamis-fingerprint', ['exports', '@angular/common/http', 'rxjs', 'rxjs/operators', 'sockjs-client', 'webstomp-client', '@angular/core', '@angular/material', '@angular/flex-layout', '@angular/common', '@stomp/ng2-stompjs', '@angular/platform-browser', '@angular/router'], factory) :
            (factory((global['lamis-fingerprint'] = {}), global.ng.common.http, global.rxjs, global.rxjs.operators, global.SockJs, global.Stomp, global.ng.core, global.ng.material, global.ng['flex-layout'], global.ng.common, global.ng2Stompjs, global.ng.platformBrowser, global.ng.router));
}(this, (function (exports, i1, rxjs, operators, SockJs, Stomp, i0, material, flexLayout, common, ng2Stompjs, platformBrowser, router) {
    'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PatientService = /** @class */ (function () {
        function PatientService(http) {
            this.http = http;
        }

        /**
         * @return {?}
         */
        PatientService.prototype.getPatients = /**
         * @return {?}
         */
        function () {
            return this.http.get('/api/patients');
        };
        PatientService.decorators = [
            {
                type: i0.Injectable, args: [{
                    providedIn: 'root'
                },]
            }
        ];
        /** @nocollapse */
        PatientService.ctorParameters = function () {
            return [
                {type: i1.HttpClient}
            ];
        };
        /** @nocollapse */ PatientService.ngInjectableDef = i0.defineInjectable({
            factory: function PatientService_Factory() {
                return new PatientService(i0.inject(i1.HttpClient));
            }, token: PatientService, providedIn: "root"
        });
        return PatientService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var EventManager = /** @class */ (function () {
        function EventManager() {
            var _this = this;
            this.observable = rxjs.Observable.create(function (observer) {
                _this.observer = observer;
            }).pipe(operators.share());
        }

        /**
         * Method to broadcast the event to observer
         */
        /**
         * Method to broadcast the event to observer
         * @param {?} event
         * @return {?}
         */
        EventManager.prototype.broadcast = /**
         * Method to broadcast the event to observer
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.observer != null) {
                this.observer.next(event);
            }
        };
        /**
         * Method to subscribe to an event with callback
         */
        /**
         * Method to subscribe to an event with callback
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        EventManager.prototype.subscribe = /**
         * Method to subscribe to an event with callback
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        function (eventName, callback) {
            /** @type {?} */
            var subscriber = this.observable
                .pipe(operators.filter(function (event) {
                    return event.name === eventName;
                }))
                .subscribe(callback);
            return subscriber;
        };
        /**
         * Method to unsubscribe the subscription
         */
        /**
         * Method to unsubscribe the subscription
         * @param {?} subscriber
         * @return {?}
         */
        EventManager.prototype.destroy = /**
         * Method to unsubscribe the subscription
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            subscriber.unsubscribe();
        };
        EventManager.decorators = [
            {
                type: i0.Injectable, args: [{
                    providedIn: 'root'
                },]
            }
        ];
        /** @nocollapse */
        EventManager.ctorParameters = function () {
            return [];
        };
        /** @nocollapse */ EventManager.ngInjectableDef = i0.defineInjectable({
            factory: function EventManager_Factory() {
                return new EventManager();
            }, token: EventManager, providedIn: "root"
        });
        return EventManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function _window() {
        // return the global native browser window object
        return window;
    }

    var WindowRef = /** @class */ (function () {
        function WindowRef(eventManager) {
            this.eventManager = eventManager;
        }

        Object.defineProperty(WindowRef.prototype, "nativeWindow", {
            get: /**
             * @return {?}
             */ function () {
                return _window();
            },
            enumerable: true,
            configurable: true
        });
        WindowRef.decorators = [
            {type: i0.Injectable, args: [{providedIn: 'root'},]}
        ];
        /** @nocollapse */
        WindowRef.ctorParameters = function () {
            return [
                {type: EventManager}
            ];
        };
        /** @nocollapse */ WindowRef.ngInjectableDef = i0.defineInjectable({
            factory: function WindowRef_Factory() {
                return new WindowRef(i0.inject(EventManager));
            }, token: WindowRef, providedIn: "root"
        });
        return WindowRef;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WebsocketService = /** @class */ (function () {
        function WebsocketService($window) {
            this.$window = $window;
            this.stompClient = null;
            this.messageSubscriber = null;
            this.deviceSubscriber = null;
            this.fingerSubscriber = null;
            this.scoreSubscriber = null;
            this.alreadyConnectedOnce = false;
            this.connection = this.createConnection();
            this.messageListener = this.createMessageListener();
            this.deviceListener = this.createDeviceListener();
            this.fingerListener = this.createFingerListener();
            this.scoreListener = this.createScoreListener();
        }

        /**
         * @return {?}
         */
        WebsocketService.prototype.connect = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.connectedPromise === null) {
                this.connection = this.createConnection();
            }
            // building absolute path so that websocket doesn't fail when deploying with a context path
            /** @type {?} */
            var loc = this.$window.nativeWindow.location;
            /** @type {?} */
            var url;
            url = '//' + loc.host + loc.pathname + 'websocket';
            console.log('SockJS', SockJs);
            /** @type {?} */
            var socket = new SockJs(url);
            this.stompClient = Stomp.over(socket);
            /** @type {?} */
            var headers = {};
            this.stompClient.connect(headers, function () {
                _this.connectedPromise('success');
                _this.connectedPromise = null;
                _this.probeReaders();
            });
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.disconnect = /**
         * @return {?}
         */
        function () {
            if (this.stompClient !== null) {
                this.stompClient.disconnect();
                this.stompClient = null;
            }
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }
            this.alreadyConnectedOnce = false;
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.messageReceive = /**
         * @return {?}
         */
        function () {
            return this.messageListener;
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.deviceReceive = /**
         * @return {?}
         */
        function () {
            return this.deviceListener;
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.fingerReceive = /**
         * @return {?}
         */
        function () {
            return this.fingerListener;
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.scoreReceive = /**
         * @return {?}
         */
        function () {
            return this.scoreListener;
        };
        /**
         * @param {?} reader
         * @param {?} patient
         * @return {?}
         */
        WebsocketService.prototype.verify = /**
         * @param {?} reader
         * @param {?} patient
         * @return {?}
         */
        function (reader, patient) {
            if (this.stompClient !== null && this.stompClient.connected) {
                this.stompClient.send('/topic/medical/verify', // destination
                    JSON.stringify({
                        activeReader: reader,
                        patient: patient
                    }), // body
                    {} // header
                );
            }
        };
        /**
         * @param {?} reader
         * @param {?} patient
         * @param {?} finger
         * @return {?}
         */
        WebsocketService.prototype.enrol = /**
         * @param {?} reader
         * @param {?} patient
         * @param {?} finger
         * @return {?}
         */
        function (reader, patient, finger) {
            if (this.stompClient !== null && this.stompClient.connected) {
                this.stompClient.send('/topic/medical/enrol', // destination
                    JSON.stringify({
                        activeReader: reader,
                        patient: patient,
                        finger: finger
                    }), // body
                    {} // header
                );
            }
        };
        /**
         * @param {?} reader
         * @return {?}
         */
        WebsocketService.prototype.identify = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            if (this.stompClient !== null && this.stompClient.connected) {
                this.stompClient.send('/topic/medical/identify', // destination
                    JSON.stringify({
                        activeReader: reader
                    }), // body
                    {} // header
                );
            }
        };
        /**
         * @param {?} patient
         * @return {?}
         */
        WebsocketService.prototype.fingerprintStatus = /**
         * @param {?} patient
         * @return {?}
         */
        function (patient) {
            if (this.stompClient !== null && this.stompClient.connected) {
                this.stompClient.send('/topic/medical/fingerprint-status', // destination
                    JSON.stringify({
                        patient: patient
                    }), // body
                    {} // header
                );
            }
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.probeReaders = /**
         * @return {?}
         */
        function () {
            if (this.stompClient !== null && this.stompClient.connected) {
                this.stompClient.send('/topic/probe-readers', // destination
                    {}, // body
                    {} // header
                );
            }
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.subscribe = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.connection.then(function () {
                _this.messageSubscriber = _this.stompClient.subscribe('/topic/fingerprint/message', function (data) {
                    _this.messageListenerObserver.next(JSON.parse(data.body));
                });
                _this.deviceSubscriber = _this.stompClient.subscribe('/topic/fingerprint/device', function (data) {
                    _this.deviceListenerObserver.next(JSON.parse(data.body));
                });
                _this.fingerSubscriber = _this.stompClient.subscribe('/topic/fingerprint/finger', function (data) {
                    _this.fingerListenerObserver.next(JSON.parse(data.body));
                });
                _this.messageSubscriber = _this.stompClient.subscribe('/topic/fingerprint/score', function (data) {
                    _this.scoreListenerObserver.next(JSON.parse(data.body));
                });
            });
        };
        /**
         * @return {?}
         */
        WebsocketService.prototype.unsubscribe = /**
         * @return {?}
         */
        function () {
            if (this.messageSubscriber !== null) {
                this.messageSubscriber.unsubscribe();
            }
            if (this.deviceSubscriber !== null) {
                this.deviceSubscriber.unsubscribe();
            }
            if (this.fingerSubscriber !== null) {
                this.fingerSubscriber.unsubscribe();
            }
            if (this.scoreSubscriber !== null) {
                this.scoreSubscriber.unsubscribe();
            }
            this.messageListener = this.createMessageListener();
            this.deviceListener = this.createDeviceListener();
            this.fingerListener = this.createFingerListener();
            this.scoreListener = this.createScoreListener();
        };
        /**
         * @private
         * @return {?}
         */
        WebsocketService.prototype.createMessageListener = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this.messageListenerObserver = observer;
            });
        };
        /**
         * @private
         * @return {?}
         */
        WebsocketService.prototype.createDeviceListener = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this.deviceListenerObserver = observer;
            });
        };
        /**
         * @private
         * @return {?}
         */
        WebsocketService.prototype.createFingerListener = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this.fingerListenerObserver = observer;
            });
        };
        /**
         * @private
         * @return {?}
         */
        WebsocketService.prototype.createScoreListener = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this.scoreListenerObserver = observer;
            });
        };
        /**
         * @private
         * @return {?}
         */
        WebsocketService.prototype.createConnection = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                return (_this.connectedPromise = resolve);
            });
        };
        WebsocketService.decorators = [
            {type: i0.Injectable, args: [{providedIn: 'root'},]}
        ];
        /** @nocollapse */
        WebsocketService.ctorParameters = function () {
            return [
                {type: WindowRef}
            ];
        };
        /** @nocollapse */ WebsocketService.ngInjectableDef = i0.defineInjectable({
            factory: function WebsocketService_Factory() {
                return new WebsocketService(i0.inject(WindowRef));
            }, token: WebsocketService, providedIn: "root"
        });
        return WebsocketService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var FingerprintIndex = {
        'LEFT_INDEX': 0, 'LEFT_THUMB': 1,
        'RIGHT_INDEX': 2, 'RIGHT_THUMB': 3,
    };
    FingerprintIndex[FingerprintIndex['LEFT_INDEX']] = 'LEFT_INDEX';
    FingerprintIndex[FingerprintIndex['LEFT_THUMB']] = 'LEFT_THUMB';
    FingerprintIndex[FingerprintIndex['RIGHT_INDEX']] = 'RIGHT_INDEX';
    FingerprintIndex[FingerprintIndex['RIGHT_THUMB']] = 'RIGHT_THUMB';
    var FingerprintComponent = /** @class */ (function () {
        function FingerprintComponent(rxStompService, patientService, websocketService) {
            this.rxStompService = rxStompService;
            this.patientService = patientService;
            this.websocketService = websocketService;
            this.prompt = '';
            this.icon = 'fingerprint:default_sensor';
            this.scoreIcon = 'fingerprint:score_0';
            this.fingerIcon = 'fingerprint:left_index';
            this.enrolling = false;
        }

        /**
         * @param {?} patient
         * @return {?}
         */
        FingerprintComponent.prototype.patientSelected = /**
         * @param {?} patient
         * @return {?}
         */
        function (patient) {
            this.patient = patient;
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.verify = /**
         * @return {?}
         */
        function () {
            this.rxStompService.publish({
                destination: '/topic/medical/verify',
                body: JSON.stringify({
                    activeReader: this.activeReader.serial,
                    patient: this.patient
                })
            });
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.enrol = /**
         * @return {?}
         */
        function () {
            this.rxStompService.publish({
                destination: '/topic/medical/enrol',
                body: JSON.stringify({
                    activeReader: this.activeReader.serial,
                    patient: this.patient,
                    finger: this.fingerprint
                })
            });
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.identify = /**
         * @return {?}
         */
        function () {
            this.rxStompService.publish({
                destination: '/topic/medical/identify',
                body: JSON.stringify({
                    activeReader: this.activeReader.serial
                })
            });
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.fingerprintStatus = /**
         * @return {?}
         */
        function () {
            this.rxStompService.publish({
                destination: '/topic/medical/fingerprint-status',
                body: JSON.stringify({
                    patient: this.patient
                })
            });
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.probeReaders = /**
         * @return {?}
         */
        function () {
            this.rxStompService.publish({
                destination: '/topic/fingerprint/probe-readers',
                body: JSON.stringify({})
            });
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.stopCapture = /**
         * @return {?}
         */
        function () {
            this.rxStompService.publish({
                destination: '/topic/fingerprint/stop-capture',
                body: JSON.stringify({})
            });
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.patientService.getPatients().subscribe(function (res) {
                return _this.patients = res;
            });
            this.messageSubscription = this.rxStompService.watch('/topic/fingerprint/message')
                .subscribe(function (res) {
                    /** @type {?} */
                    var message = JSON.parse(res.body);
                    _this.prompt = message.message;
                    _this.icon = 'fingerprint:' + message.icon;
                    _this.enrolling = false;
                });
            this.deviceSubscription = this.rxStompService.watch('/topic/fingerprint/readers')
                .subscribe(function (message) {
                    _this.readers = JSON.parse(message.body);
                    if (_this.readers.length > 0) {
                        _this.activeReader = _this.readers[0];
                    } else {
                        _this.activeReader = null;
                        _this.readers = [];
                    }
                });
            this.fingerSubscription = this.rxStompService.watch('/topic/fingerprint/finger')
                .subscribe(function (res) {
                    /** @type {?} */
                    var message = JSON.parse(res.body);
                    _this.prompt = message.message;
                    _this.fingerIcon = 'fingerprint:' + message.icon;
                    _this.enrolling = true;
                });
            this.scoreSubscription = this.rxStompService.watch('/topic/fingerprint/score')
                .subscribe(function (res) {
                    /** @type {?} */
                    var message = JSON.parse(res.body);
                    _this.prompt = message.message;
                    _this.scoreIcon = 'fingerprint:' + message.icon;
                    _this.enrolling = true;
                });
            this.probeReaders();
        };
        /**
         * @param {?} s1
         * @param {?} s2
         * @return {?}
         */
        FingerprintComponent.prototype.entityCompare = /**
         * @param {?} s1
         * @param {?} s2
         * @return {?}
         */
        function (s1, s2) {
            return s1 && s2 ? s1.id === s2.id : s1 === s2;
        };
        /**
         * @return {?}
         */
        FingerprintComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.messageSubscription.unsubscribe();
            this.fingerSubscription.unsubscribe();
            this.scoreSubscription.unsubscribe();
            this.deviceSubscription.unsubscribe();
            this.stopCapture();
            this.rxStompService.deactivate();
        };
        FingerprintComponent.decorators = [
            {
                type: i0.Component, args: [{
                    selector: 'lib-fingerprint',
                    template: "<mat-card>\r\n  <mat-card-content>\r\n    <div fxLayout=\"row\">\r\n      <div fxFlex=\"80\">\r\n        <mat-form-field class=\"full-width\">\r\n          <mat-label>Available Readers:</mat-label>\r\n          <mat-select\r\n            [(value)]=\"activeReader\">\r\n            <mat-option>-- None --</mat-option>\r\n            <mat-option *ngFor=\"let reader of readers\"\r\n                        [value]=\"reader\">{{reader.name}} ({{reader.vendor}})\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <div fxFlex=\"20\">\r\n        <button mat-icon-button color=\"primary\" (click)=\"probeReaders()\">\r\n          <mat-icon>refresh</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <mat-tab-group>\r\n      <mat-tab label=\"Fingerprint Verification\">\r\n        <mat-card>\r\n          <mat-card-content>\r\n            <div fxlayout=\"column\">\r\n              <div>\r\n                <mat-form-field>\r\n                  <mat-label>Patient</mat-label>\r\n                  <mat-select [compareWith]=\"entityCompare\"\r\n                              (selectionChange)=\"patientSelected($event.value)\">\r\n                    <mat-option>-- None --</mat-option>\r\n                    <mat-option *ngFor=\"let patient of patients\"\r\n                                [value]=\"patient\">{{patient.name}}</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n                <div>\r\n                  <button mat-raised-button color=\"primary\"\r\n                          (click)=\"verify()\"\r\n                          [disabled]=\"!(!!patient && !!activeReader)\">\r\n                    Start Verification\r\n                  </button>\r\n                </div>\r\n              </div>\r\n              <div class=\"mt-1\">\r\n                <mat-divider></mat-divider>\r\n                <mat-form-field class=\"full-width\">\r\n                  <mat-label>Status Info</mat-label>\r\n                  <input matInput [disabled]=\"true\" [value]=\"prompt\"/>\r\n                </mat-form-field>\r\n                <mat-divider></mat-divider>\r\n              </div>\r\n              <div fxLayoutAlign=\"center center\">\r\n                <mat-card>\r\n                  <mat-card-content>\r\n                    <div>\r\n                      <button mat-icon-button>\r\n                        <mat-icon class=\"fingerprint\" [svgIcon]=\"icon\"></mat-icon>\r\n                      </button>\r\n                    </div>\r\n                  </mat-card-content>\r\n                </mat-card>\r\n              </div>\r\n            </div>\r\n          </mat-card-content>\r\n        </mat-card>\r\n      </mat-tab>\r\n      <mat-tab label=\"Fingerprint Enrollment\">\r\n        <mat-card>\r\n          <mat-card-content>\r\n            <div fxlayout=\"column\">\r\n              <div fxLayout=\"row wrap\">\r\n                <div fxFlex=\"100\" fxFlex.gt-sm=\"30\">\r\n                  <mat-form-field>\r\n                    <mat-label>Patient</mat-label>\r\n                    <mat-select [compareWith]=\"entityCompare\"\r\n                                (selectionChange)=\"patientSelected($event.value)\">\r\n                      <mat-option>-- None --</mat-option>\r\n                      <mat-option *ngFor=\"let patient of patients\"\r\n                                  [value]=\"patient\">{{patient.name}}</mat-option>\r\n                    </mat-select>\r\n                  </mat-form-field>\r\n                </div>\r\n                <div fxFlex=\"100\" fxFlex.gt-sm=\"30\">\r\n                  <mat-form-field>\r\n                    <mat-label>Finger</mat-label>\r\n                    <mat-select [value]=\"fingerprint\">\r\n                      <mat-option>--NONE--</mat-option>\r\n                      <mat-option [value]=\"'LEFT_INDEX'\">Left Index</mat-option>\r\n                      <mat-option [value]=\"'LEFT_THUMB'\">Left Thumb</mat-option>\r\n                      <mat-option [value]=\"'RIGHT_INDEX'\">Right Index</mat-option>\r\n                      <mat-option [value]=\"'RIGHT_THUMB'\">Right Thumb</mat-option>\r\n                    </mat-select>\r\n                  </mat-form-field>\r\n                </div>\r\n              </div>\r\n              <button mat-raised-button color=\"primary\"\r\n                      (click)=\"enrol()\"\r\n                      [disabled]=\"!(!!activeReader && !!patient && !!fingerprint)\">\r\n                Start Enrollment\r\n              </button>\r\n              <div class=\"mt-1\">\r\n                <mat-divider></mat-divider>\r\n                <mat-form-field class=\"full-width\">\r\n                  <mat-label>Status Info</mat-label>\r\n                  <input matInput [disabled]=\"true\" [value]=\"prompt\"/>\r\n                </mat-form-field>\r\n                <mat-divider></mat-divider>\r\n              </div>\r\n              <div fxLayoutAlign=\"center center\" *ngIf=\"!enrolling\">\r\n                <mat-card>\r\n                  <mat-card-content>\r\n                    <div>\r\n                      <button mat-icon-button>\r\n                        <mat-icon class=\"fingerprint\" [svgIcon]=\"icon\"></mat-icon>\r\n                      </button>\r\n                    </div>\r\n                  </mat-card-content>\r\n                </mat-card>\r\n              </div>\r\n              <ng-container *ngIf=\"enrolling\">\r\n                <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between\">\r\n                  <div fxFlex=\"100\" fxLayoutAlign=\"center center\" fxFlex.gt-sm=\"40%\">\r\n                    <mat-card>\r\n                      <mat-card-content>\r\n                        <div>\r\n                          <button mat-icon-button>\r\n                            <mat-icon class=\"fingerprint\" [svgIcon]=\"fingerIcon\"></mat-icon>\r\n                          </button>\r\n                        </div>\r\n                      </mat-card-content>\r\n                    </mat-card>\r\n                  </div>\r\n                  <div fxFlex=\"100\" fxLayoutAlign=\"center center\" fxFlex.gt-sm=\"60%\">\r\n                    <mat-card>\r\n                      <mat-card-content>\r\n                        <div>\r\n                          <button mat-icon-button>\r\n                            <mat-icon class=\"fingerprint\" [svgIcon]=\"scoreIcon\"></mat-icon>\r\n                          </button>\r\n                        </div>\r\n                      </mat-card-content>\r\n                    </mat-card>\r\n                  </div>\r\n                </div>\r\n              </ng-container>\r\n            </div>\r\n          </mat-card-content>\r\n        </mat-card>\r\n      </mat-tab>\r\n      <mat-tab label=\"Fingerprint Identification\">\r\n        <mat-card>\r\n          <mat-card-content>\r\n            <div fxlayout=\"column\">\r\n              <div>\r\n                <button mat-raised-button color=\"primary\"\r\n                        (click)=\"identify()\"\r\n                        [disabled]=\"!(!!activeReader)\">\r\n                  Start Identification\r\n                </button>\r\n              </div>\r\n              <div class=\"mt-1\">\r\n                <mat-divider></mat-divider>\r\n                <mat-form-field class=\"full-width\">\r\n                  <mat-label>Status Info</mat-label>\r\n                  <input matInput [disabled]=\"true\" [value]=\"prompt\"/>\r\n                </mat-form-field>\r\n                <mat-divider></mat-divider>\r\n              </div>\r\n              <div fxLayoutAlign=\"center center\">\r\n                <mat-card>\r\n                  <mat-card-content>\r\n                    <div>\r\n                      <button mat-icon-button>\r\n                        <mat-icon class=\"fingerprint\" [svgIcon]=\"icon\"></mat-icon>\r\n                      </button>\r\n                    </div>\r\n                  </mat-card-content>\r\n                </mat-card>\r\n              </div>\r\n            </div>\r\n          </mat-card-content>\r\n        </mat-card>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </mat-card-content>\r\n</mat-card>\r\n",
                    styles: ["mat-icon.fingerprint{-webkit-transform:scale(4);transform:scale(4)}"]
                }]
            }
        ];
        /** @nocollapse */
        FingerprintComponent.ctorParameters = function () {
            return [
                {type: ng2Stompjs.RxStompService},
                {type: PatientService},
                {type: WebsocketService}
            ];
        };
        return FingerprintComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var source = "http://" + window.location.host + "/websocket";
    /** @type {?} */
    var RxStompConfig = {
        // Which server?
        brokerURL: "" + source,
        webSocketFactory: function () {
            return new SockJS("" + source);
        },
        // Headers
        // Typical keys: login, passcode, host
        connectHeaders: {
            login: 'guest',
            passcode: 'guest'
        },
        // How often to heartbeat?
        // Interval in milliseconds, set to 0 to disable
        heartbeatIncoming: 0,
        // Typical value 0 - disabled
        heartbeatOutgoing: 20000,
        // Typical value 20000 - every 20 seconds
        // Wait in milliseconds before attempting auto reconnect
        // Set to 0 to disable
        // Typical value 500 (500 milli seconds)
        reconnectDelay: 200,
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FingerprintRoutes = [
        {
            path: '',
            component: FingerprintComponent,
            data: {
                title: 'Fingerprint Support',
                breadcrumb: 'FINGERPRINT'
            }
        }
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ɵ0 = RxStompConfig, ɵ1 = ng2Stompjs.rxStompServiceFactory;
    var FingerprintModule = /** @class */ (function () {
        function FingerprintModule(_iconRegistry, _domSanitizer) {
            this._iconRegistry = _iconRegistry;
            this._domSanitizer = _domSanitizer;
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'score_0', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/score_0.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'score_1', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/score_1.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'score_2', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/score_2.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'score_3', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/score_3.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'score_4', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/score_4.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_index', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_index.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_index', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_index.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_thumb', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_thumb.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_thumb', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_thumb.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'touched_sensor', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/touched_sensor.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'default_sensor', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/default_sensor.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'failed_sensor', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/failed_sensor.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'finger_default', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/finger_default.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'finger_disabled', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/finger_disabled.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'finger_matched', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/finger_matched.svg'));
            this._iconRegistry.addSvgIconInNamespace('fingerprint', 'finger_unknown', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/finger_unknown.svg'));
        }

        FingerprintModule.decorators = [
            {
                type: i0.NgModule, args: [{
                    declarations: [
                        FingerprintComponent
                    ],
                    imports: [
                        common.CommonModule,
                        material.MatInputModule,
                        material.MatIconModule,
                        material.MatDividerModule,
                        material.MatCardModule,
                        material.MatSelectModule,
                        material.MatButtonModule,
                        material.MatTabsModule,
                        flexLayout.FlexLayoutModule,
                        router.RouterModule.forChild(FingerprintRoutes)
                    ],
                    exports: [
                        FingerprintComponent
                    ],
                    providers: [
                        {
                            provide: ng2Stompjs.InjectableRxStompConfig,
                            useValue: ɵ0
                        },
                        {
                            provide: ng2Stompjs.RxStompService,
                            useFactory: ɵ1,
                            deps: [ng2Stompjs.InjectableRxStompConfig]
                        }
                    ]
                },]
            }
        ];
        /** @nocollapse */
        FingerprintModule.ctorParameters = function () {
            return [
                {type: material.MatIconRegistry},
                {type: platformBrowser.DomSanitizer}
            ];
        };
        return FingerprintModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.FingerprintIndex = FingerprintIndex;
    exports.FingerprintComponent = FingerprintComponent;
    exports.FingerprintModule = FingerprintModule;
    exports.ɵd = EventManager;
    exports.ɵe = FingerprintRoutes;
    exports.ɵa = PatientService;
    exports.ɵf = RxStompConfig;
    exports.ɵb = WebsocketService;
    exports.ɵc = WindowRef;

    Object.defineProperty(exports, '__esModule', {value: true});

})));

//# sourceMappingURL=lamis-fingerprint.umd.js.map
