import {Facility} from './facility.model';
import {Moment} from 'moment';

export interface Patient {
    id?: number;
    hospitalNum?: string;
    surname?: string;
    otherNames?: string;
    statusAtRegistration?: string;
    dateRegistration?: Moment;
    dateBirth?: Moment;
    gender?: string;
    facility?: Facility;
    uuid?: string;
}

export interface OpportunisticInfection {
    id?: number;
    description?: string;
}

export interface Adhere {
    id?: number;
    description?: string;
}

export interface AdverseDrugReaction {
    id?: number;
    description?: string;
}

export interface ClinicAdhere {
    id?: number;
    adhere?: Adhere;
    uuid?: string;
}

export interface ClinicAdverseDrugReaction {
    id?: number;
    adverseDrugReaction?: AdverseDrugReaction;
    severity?: string;
    uuid?: string;
}

export interface ClinicOpportunisticInfection {
    id?: number;
    opportunisticInfection?: OpportunisticInfection;
    uuid?: string;
}

export interface Clinic {
    facility?: Facility;
    patient?: Patient;
    id?: number;
    dateVisit?: Moment;
    clinicStage?: string;
    funcStatus?: string;
    tbStatus?: string;
    viralLoad?: number;
    cd4?: number;
    cd4p?: number;
    regimenType?: any;
    regimen?: any;
    bodyWeight?: number;
    height?: number;
    waist?: number;
    bp?: string;
    archived?: boolean;
    pregnant?: boolean;
    pregnancyStatus?: number;
    lmp?: Moment;
    breastfeeding?: boolean;
    oiScreened?: string;
    stiTreated?: string;
    adrScreened?: boolean;
    adherenceLevel?: string;
    commence?: boolean;
    nextAppointment?: Moment;
    notes?: string;
    bp1?: number;
    bp2?: number;
    gestationalAge?: string;
    maternalStatusArt?: string;
    uuid?: string;
}

export interface ClinicVm {
    clinic?: Clinic;
    adhereList?: Adhere[];
    adrList?: ClinicAdverseDrugReaction[];
    oiList?: OpportunisticInfection[];
}

export interface ChronicCare {
    id?: number;
    uuid?: string;
    patient?: Patient;
    facility?: Facility;
    dateVisit?: Moment;
    currentStatus?: string;
    clinicStage?: string;
    clientType?: string;
    pregnancyStatus?: string;
    lastCd4?: number;
    dateLastCd4?: Moment;
    lastViralLoad?: number;
    dateLastViralLoad?: Moment;
    eligibleCd4?: boolean;
    eligibleViralLoad?: boolean;
    plhivSymtomaticHiv?: boolean;
    plhivAsymtomaticCD4L500?: boolean;
    plhivActiveTb?: boolean;
    plhivPregnantAfter1stTrimester?: boolean;
    plhivL5Years?: boolean;
    ipt?: boolean;
    inh?: boolean;
    tbTreatment?: boolean;
    dateStartedTbTreatment?: Moment;
    tbReferred?: boolean;
    eligibleIpt?: boolean;
    bodyWeight?: number;
    height?: number;
    muac?: number;
    muacPediatrics?: string;
    bmi?: string;
    muacPregnant?: string;
    supplementaryFood?: boolean;
    nutritionalStatusReferred?: boolean;
    sexuallyAbused?: boolean;
    essentialsDeniedByPartner?: boolean;
    sexuallyAbusedReferred?: boolean;
    essentialsDeniedByPartnerReferred?: boolean;
    hypertensive?: boolean;
    firstHypertensive?: boolean;
    bpAbove14090?: boolean;
    bpReferred?: boolean;
    diabetic?: boolean;
    firstDiabetic?: boolean;
    dmReferred?: boolean;
    missedArvs?: string;
    missedArvsServicesProvided?: boolean;
    statusDisclosedToPartner?: boolean;
    partnerStatusKnown?: boolean;
    useCondomsAlways?: boolean;
    useCondomsAlwaysServicesProvided?: boolean;
    opportunisticInfections?: boolean;
    missedCotrim?: string;
    weeklyAlcoholConsumption?: boolean;
    weeklyAlcoholConsumptionServicesProvided?: boolean;
    washServicesProvided?: boolean;
    useInsecticideNets?: boolean;
    cervicalCancerScreening?: boolean;
    activeMemberOfSG?: boolean;
    familyPlanning?: boolean;
    basicCareKits?: boolean;
    disclosureCounseling?: boolean;
    socialServices?: boolean;
    legalServices?: boolean;
    linkageToIGA?: boolean;
    otherServices?: boolean;
    cervicalCancerScreeningWithinPastYear?: boolean;
    cervicalCancerScreeningWithinPastYearReferred?: boolean;
    wantPregnancyWithinAYear?: boolean;
    wantPregnancyWithinAYearReferred?: boolean;
    currentlyUsingContraceptive?: boolean;
    currentlyUsingContraceptiveReferred?: boolean;
    useInsecticideBedNet?: boolean;
    useInsecticideBedNetReferred?: boolean;
    pregnantIntermittentPreventiveTherapy?: boolean;
    pregnantIntermittentPreventiveTherapyReferred?: boolean;
}

export interface DMScreen {
    id?: number;
    description?: string;
}

export interface TBScreen {
    id?: number;
    description?: string;
}

export interface ChronicCareTB {
    id?: number;
    description?: string;
    tbScreen: TBScreen;
}

export interface ChronicCareDm {
    id?: number;
    description?: string;
    dmScreen: DMScreen;
}

export interface ChronicCareVm {
    chronicCare?: ChronicCare;
    dms?: ChronicCareDm[];
    tbs?: ChronicCareTB[];
}

export interface EAC {
    id?: number;
    patient?: Patient;
    facility?: Facility;
    dateEac1?: Moment;
    dateEac2?: Moment;
    dateEac3?: Moment;
    dateSampleCollected?: Moment;
    dateLastViralLoad?: Moment;
    lastViralLoad?: number;
    notes?: string;
    uuid?: string;
}
