import { OnInit } from '@angular/core';
import { PharmacyService } from '../services/pharmacy.service';
import { Pharmacy } from '../model/pharmacy.model';
import { CardViewItem } from '@alfresco/adf-core';
export declare class PharmacyWidget implements OnInit {
    private pharmacyService;
    patientId: number;
    pharmacy: Pharmacy;
    properties: CardViewItem[];
    constructor(pharmacyService: PharmacyService);
    ngOnInit(): void;
    buildProperties(): void;
}
