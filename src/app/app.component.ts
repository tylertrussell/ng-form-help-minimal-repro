import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';

const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
        return { passwordsDontMatch: true };
    } else {
        return null;
    }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    name = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]);
    passwordConfirm = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]);
    formGroup = new FormGroup({
        'name': this.name,
        'email': this.email,
        'password': this.password,
        'passwordConfirm': this.passwordConfirm
    }, { validators: passwordsMatchValidator });


    constructor () {}

    errorMessages: { [key: string]: string; } = {
        'name': 'Tell us what we should call you',
        'email': 'A valid email is required for your account',
        'password': 'Enter an 8 to 64 character password',
        'passwordsDontMatch': "Passwords don't match",
    };

    getErrorMessage(fieldName: string) {
        return this.errorMessages[fieldName];
    }

    getPasswordConfirmErrorMessage() {
        let errorMessage = null;
        console.log(this.passwordConfirm);
        console.log(this.formGroup);
        if (this.passwordConfirm &&
            this.passwordConfirm.errors &&
            (this.passwordConfirm.errors['required'] || this.passwordConfirm.errors['minlength'] || this.passwordConfirm.errors['maxlength'])) {
            errorMessage = this.errorMessages['password'];
        } else if (this.formGroup &&
            this.formGroup.errors &&
            this.formGroup.errors['passwordsDontMatch']) {
            errorMessage = this.errorMessages['passwordsDontMatch'];
        }
        console.log("Error message: " + errorMessage);
        return errorMessage;
    }

    submitForm() {
        if (!(this.name.invalid || this.email.invalid || this.password.invalid)) {
            console.log('success');
        } else {
            console.log('invalid');
        }
    }
}

