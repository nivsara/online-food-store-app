import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (pwdCtrlName: string, confirmPwdCtrlName: string) => {
  const validator = (form: AbstractControl) => {
    const passwordCtrl = form.get(pwdCtrlName);
    const confirmPasswordCtrl = form.get(confirmPwdCtrlName);
    if(!passwordCtrl || !confirmPasswordCtrl) return;
    if(passwordCtrl.value !== confirmPasswordCtrl.value) {
      confirmPasswordCtrl.setErrors({notMatch : true})
    } else {
      const ctrlErrors = confirmPasswordCtrl.errors;
      if(!ctrlErrors) return;
      delete ctrlErrors.notMatch;
      confirmPasswordCtrl.setErrors(ctrlErrors);
    }
  }
  return validator;
}
