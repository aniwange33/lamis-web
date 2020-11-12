import {Moment} from 'moment';
import {Facility} from './facility.model';

export interface CaseManager {
    id?: number;
    name?: string;
    gender?: string;
    phoneNumber?: string;
    address?: string;
    uuid?: string;
    facility?: Facility;
}

export interface Patient {
    id?: number;
    name?: string;
    dateBirth?: Moment;
    address?: string;
    gender?: string;
    hospitalNum?: string;
    currentStatus?: string;
    uuid?: string;
    selected?: boolean;
    caseManagerId?: number;
    caseManager?: CaseManager;
}

export interface CaseManagerStats {
    assigned?: number;
    stable?: number;
    preArt?: number;
    unstableLessThan1year?: number;
    unstableMoreThan1Year?: number;
}
