import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { UserRole } from 'src/services/auth/dto/user-role.enum';

export function IsNotAdmin(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNotAdmin',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, _: ValidationArguments) {
                    return value !== UserRole.ADMIN;
                },
                defaultMessage(_: ValidationArguments) {
                    return 'Invalid user role';
                }
            }
        })
    }
}