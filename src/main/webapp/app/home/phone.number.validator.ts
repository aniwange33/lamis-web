import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
    selector: '[phoneNumber]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PhoneNumberValidator,
        multi: true
    }]
})
export class PhoneNumberValidator implements Validator {
    prefixes = '0703|0706|0803|0806|0810|0813|0814|0816|0903|0906|0705|0805|0807|0811|0815|0905|0701|0708|0802|0808|0812|0902|0907|0901|0809|0817|0818|0908|0909|07028|07029|0819|07025|07026|0704|07027|0709|0707|0804|0702';

    validate(control: AbstractControl): ValidationErrors | null {
        const phone: string = control.value;
        if (!phone) {
            return null;
        }
        if (phone.length != 11) {
            return {
                invalidPhone: true
            }
        }
        const prefix = phone.substr(0, 4);
        if (!this.prefixes.includes(prefix)) {
            return {
                invalidPhone: true
            }
        }
    }
}
