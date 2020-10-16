import { filter } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import BaseComponent from './base.component';
import WithValidator from './with-validator.component';

export default abstract class FormComponent extends BaseComponent implements WithValidator {

    public formGroup: FormGroup;

    constructor(componentName: string){
        super(componentName)
    }

    abstract initForm(fb: FormBuilder): void
 
    validate(controlName: string) : AbstractControl {
        return this.formGroup.get(controlName)
    }
}