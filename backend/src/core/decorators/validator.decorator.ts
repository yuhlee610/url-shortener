import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

const validateUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const IsUrl = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) =>
    registerDecorator({
      name: 'IsUrl',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validateUrl(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid URL`;
        },
      },
    });
};
