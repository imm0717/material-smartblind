import { AbstractControl } from '@angular/forms';
export default interface WithValidator {
    validate(controlName: string) : AbstractControl
}