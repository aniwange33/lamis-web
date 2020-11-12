import {OnInit} from "@angular/core";
import {PatientService} from "../services/patient.service";
import {ActivatedRoute} from "@angular/router";

export declare class DetailedTimelineComponent implements OnInit {
    private patientService;
    private route;
    id: number;
    uuid: string;

    constructor(patientService: PatientService, route: ActivatedRoute);

    ngOnInit(): void;

    previousState(): void;
}
