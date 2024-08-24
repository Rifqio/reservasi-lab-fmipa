import { registerDecorator, ValidationOptions, ValidationArguments, isString  } from 'class-validator';

export function IsValidUNSEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsValidUNSEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    if (!isString(value)) return false;
                    // Check if the email domain is uns.ac.id
                    const domainPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*uns\.ac\.id$/;
                    return domainPattern.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Email is not valid UNS email';
                },
            },
        });
    };
}
