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

export interface Biometric {
    id?: string;
    patient?: Patient;
    facility?: Facility;
    template?: any;
    templateType?: Finger;
    biometricType: string;
    date?: Moment;
}

export interface BiometricResponse {
    template?: any;
    id?: string;
    message?: string;
}

export declare enum Finger {
    RIGHT_INDEX_FINGER = "Right Index Finger",
    LEFT_INDEX_FINGER = "Left Index Finger",
    RIGHT_THUMB = "Right Thumb",
    LEFT_THUMB = "Left Thumb",
    RIGHT_MIDDLE_FINGER = "Right Middle Finger",
    LEFT_MIDDLE_FINGER = "Left Middle Finger"
}
