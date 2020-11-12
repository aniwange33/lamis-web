import {OnInit} from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {Clinic} from '../../model/clinic.model';
import {CardViewItem} from "@alfresco/adf-core";

export declare class ClinicWidget implements OnInit {
    private clinicService;
    patientId: number;
    clinic: Clinic;
    properties: CardViewItem[];

    constructor(clinicService: ClinicService);

    ngOnInit(): void;

    buildProperties(): void;
}
