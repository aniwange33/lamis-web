import { OnInit } from '@angular/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { Devolve, RelatedCD4, RelatedClinic, RelatedPharmacy, RelatedViralLoad } from '../model/pharmacy.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { DevolveService } from '../services/devolve.service';
export declare class DevolveDetailsComponent implements OnInit {
    private router;
    private route;
    private devolveService;
    private _dialogService;
    private notificationService;
    properties: CardViewItem[];
    entity: Devolve;
    relatedClinic: RelatedClinic;
    relatedPharmacy: RelatedPharmacy;
    relatedCD4: RelatedCD4;
    relatedViralLoad: RelatedViralLoad;
    constructor(router: Router, route: ActivatedRoute, devolveService: DevolveService, _dialogService: TdDialogService, notificationService: NotificationService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
}
