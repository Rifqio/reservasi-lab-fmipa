import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsPasswordMatchConstraints implements ValidatorConstraintInterface {
    validate(confirmPassword: any, args?: ValidationArguments): boolean {
        const [relatedPropertyName] = args.constraints;
        const password = (args.object as any)[relatedPropertyName];
        return password === confirmPassword;
    }

    defaultMessage?(args?: ValidationArguments): string {
        const [relatedPropertyName] = args.constraints;
        return `${relatedPropertyName} and confirm password do not match`;
    }
}

export function IsPasswordMatch(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsPasswordMatchConstraints
        })
    }
}