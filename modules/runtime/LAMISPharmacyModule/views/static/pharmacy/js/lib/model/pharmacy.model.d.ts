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

export interface RegimenType {
    id?: number;
    description?: string;
}

export interface Regimen {
    id?: number;
    description?: string;
    regimenType?: RegimenType;
}

export interface Drug {
    id?: number;
    abbrev?: string;
    name?: string;
    morning?: number;
    afternoon?: number;
    evening?: number;
}

export interface DrugDTO {
    drug?: Drug;
    regimenDrug?: RegimenDrug;
}

export interface RegimenDrug {
    id?: number;
}

export interface Adr {
    id?: number;
    description?: number;
}

export interface PharmacyAdr {
    id?: number;
    severity?: string;
    adr?: Adr;
}

export interface PharmacyLine {
    id?: number;
    description?: string;
    morning?: number;
    afternoon?: number;
    evening?: number;
    duration?: number;
    quantity?: number;
    regimenType?: RegimenType;
    regimen?: Regimen;
    regimenDrug?: RegimenDrug;
    drug?: Drug;
}

export interface Pharmacy {
    facility?: Facility;
    patient?: Patient;
    id?: number;
    dateVisit?: Moment;
    duration?: number;
    mmdType?: string;
    adrScreened?: boolean;
    prescriptionError?: boolean;
    nextAppointment?: Moment;
    adrs?: PharmacyAdr[];
    lines?: PharmacyLine[];
    uuid?: string;
}

export interface RegimenInfo {
    regimenType?: string;
    regimen?: string;
}

export interface CommunityPharmacy {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    lga?: any;
}

export interface RelatedClinic {
    id?: number;
    dateVisit?: string;
    clinicStage?: string;
}

export interface RelatedPharmacy {
    id?: number;
    dateVisit?: string;
    regimen?: string;
}

export interface RelatedViralLoad {
    id?: number;
    dateResultReceived?: string;
    value?: number;
}

export interface RelatedCD4 {
    id?: number;
    dateResultReceived?: string;
    value?: number;
}

export interface Devolve {
    id?: number;
    uuid?: string;
    patient?: Patient;
    facility?: Facility;
    communityPharmacy?: CommunityPharmacy;
    dateDevolved?: Moment;
    dateDiscontinued?: Moment;
    dateReturnedToFacility?: Moment;
    dmocType?: string;
    dateNextClinic?: Moment;
    dateNextRefill?: Moment;
    notes?: string;
    reasonDiscontinued?: string;
    relatedCd4?: RelatedCD4;
    relatedClinic?: RelatedClinic;
    relatedPharmacy?: RelatedViralLoad;
    relatedViralLoad?: RelatedViralLoad;
}
