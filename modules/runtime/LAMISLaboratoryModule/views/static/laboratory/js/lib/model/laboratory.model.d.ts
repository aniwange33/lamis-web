import { Facility } from './facility.model';
import { Moment } from 'moment';
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
    description?: string;
    result?: string;
    comment?: string;
    lab_test_id?: number;
    indication?: string;
    unit?: string;
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
