import { AbstractControl, ValidationErrors } from "@angular/forms";

const urlRegex = new RegExp(
  "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
);
export const urlValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const isValid = urlRegex.test(control.value);

  return isValid
    ? null
    : {
        invalidUrl: {
          value: control.value,
        },
      };
};

const pathRegex = /^\/[a-zA-Z0-9\-_\/]*$/;
export const pathValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  return pathRegex.test(control.value)
    ? null
    : {
        invalidPath: {
          value: control.value,
        },
      };
};
