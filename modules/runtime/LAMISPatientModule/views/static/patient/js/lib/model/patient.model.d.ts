import { Facility } from './facility.model';
import { Moment } from 'moment';
export declare const enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    MALE_TO_FEMALE = "MALE_TO_FEMALE",
    FEMALE_TO_MALE = "FEMALE_TO_MALE"
}
export declare const enum MaritalStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    CONCUBINAGE = "CONCUBINAGE",
    WIDOWED = "WIDOWED",
    DIVORCED = "DIVORCED",
    SEPARATED = "SEPARATED"
}
export declare const enum BloodType {
    A = "A",
    B = "B",
    AB = "AB",
    O = "O"
}
export declare const enum Rhesus {
    POS = "POS",
    NEG = "NEG"
}
export declare const enum HB {
    AA = "AA",
    AS = "AS",
    SS = "SS",
    SC = "SC",
    CC = "CC",
    ATHAL = "ATHAL",
    BTHAL = "BTHAL"
}
export interface Lga {
    id?: number;
    name?: string;
}
export interface StatusHistory {
    id?: number;
    status?: string;
    dateStatus?: Moment;
    outcome?: string;
    agreedDate?: Moment;
    causeOfDeath?: string;
    dateTracked?: Moment;
    reasonForInterruption?: string;
    extra?: any;
    patient?: Patient;
    facility?: Facility;
    uuid?: string;
}
export interface Patient {
    facility?: Facility;
    id?: number;
    hospitalNum?: string;
    uniqueId?: string;
    name?: string;
    surname?: string;
    otherNames?: string;
    gender?: string;
    dateBirth?: Moment;
    dod?: Moment;
    dobEstimated?: boolean;
    archived?: boolean;
    maritalStatus?: string;
    criticalInfo?: string;
    generalInfo?: string;
    education?: string;
    occupation?: string;
    address?: string;
    phone?: string;
    nextOfKin?: string;
    nextOfKinAddress?: string;
    nextOfKinPhone?: string;
    nextOfKinRelationship?: string;
    entryPoint?: string;
    targetGroup?: string;
    dateConfirmedHiv?: Moment;
    dateEnrolledPMTCT?: Moment;
    sourceReferral?: string;
    timeHivDiagnosis?: string;
    tbStatus?: string;
    pregnant?: boolean;
    breastfeeding?: boolean;
    pregnancyStatus?: number;
    dateRegistration?: Moment;
    statusAtRegistration?: string;
    enrollmentSetting?: string;
    dateStarted?: Moment;
    otherInfo?: string;
    status?: string;
    lga?: Lga;
    extra?: any;
    uuid?: string;
}
export interface OVC {
    id?: number;
    uuid?: string;
    householdUniqueNo?: string;
    facility?: Facility;
    patient?: Patient;
    referredTo?: string;
    dateReferredTo?: Moment;
    referredFrom?: string;
    dateReferredFrom?: Moment;
    servicesProvided?: any[];
}
export interface PatientOvc {
    patient: Patient;
    ovc: OVC;
}
