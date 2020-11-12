import {OnInit} from '@angular/core';
import {CardViewItem} from '@alfresco/adf-core';
import {FieldType} from '@lamis/web-core';
import {PatientService} from '../services/patient.service';

export interface Summary {
    header?: string;
    headerClass?: string;
    fields: Field[];
}

export interface Field {
    type: FieldType;
    label: string;
    value: any;
}

export declare class SummaryWidgetComponent implements OnInit {
    private patientService;
    patientId: number;
    patientUuid: string;
    summaries: Summary[];

    constructor(patientService: PatientService);

    ngOnInit(): void;

    propertiesForSummary(summary: Summary): Array<CardViewItem>;
}
