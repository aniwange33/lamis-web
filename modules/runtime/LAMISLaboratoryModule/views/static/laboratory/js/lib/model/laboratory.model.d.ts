import {Facility} from './facility.model';
import {Moment} from 'moment';

export interface Patient {
    id?: number;
    facility?: Facility;
    hospitalNum?: string;
    surname?: string;
    otherNames?: string;
    dateRegistration?: Moment;
    dateStarted?: Moment;
    gender?: string;
    uuid?: string;
}

export interface LabTestCategory {
    id?: number;
    category?: string;
}

export interface LabTest {
    id?: number;
    description?: string;
    unit?: string;
    type?: LabTestCategory;
}

export interface LaboratoryLine {
    id?: number;
    result?: string;
    comment?: string;
    labTest?: LabTest;
    indication?: string;
}

export interface Laboratory {
    facility?: Facility;
    patient?: Patient;
    id?: number;
    dateResultReceived?: Moment;
    dateSampleCollected?: Moment;
    dateAssay?: Moment;
    labNo?: string;
    lines?: LaboratoryLine[];
    uuid?: string;
}
