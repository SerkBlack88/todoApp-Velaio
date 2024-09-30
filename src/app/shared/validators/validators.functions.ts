import { AbstractControl, FormArray, ValidationErrors } from "@angular/forms";

export function minLengthArray(min: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { minLengthArray: { valid: false } };
      }
      return null;
    };
}

export function noDuplicateNames(control: AbstractControl): ValidationErrors | null {
    if (control instanceof FormArray) {
      const names = control.controls.map(group => group.get('personName')?.value?.toLowerCase().trim());
      const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index);
      return hasDuplicates ? { duplicateNames: true } : null;
    }
    return null;
  }