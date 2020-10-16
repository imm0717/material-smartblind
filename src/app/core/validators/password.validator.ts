import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function arePasswordsEquals(control: FormGroup): ValidationErrors {
    var match = true
    var passwordValue
    for (const key in control.controls) {
        if (Object.prototype.hasOwnProperty.call(control.controls, key)) {
            const element = control.controls[key];
            if (passwordValue === undefined) {
                passwordValue = element.value
            } else {
                if (element.value != passwordValue) {
                    match = false
                    break
                }
            }
        }
    }

    if (match)
        return null

    return { passwordMatch: true }
}