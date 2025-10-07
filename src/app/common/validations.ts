import { Validators } from '@angular/forms';

export const validationMessages = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  minlength: (min: number) => `Minimum length is ${min} characters.`,
  maxlength: (max: number) => `Maximum length is ${max} characters.`,
};

export const emailValidator = Validators.compose([Validators.required, Validators.email]);

export const passwordValidator = Validators.compose([
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(128),
]);
