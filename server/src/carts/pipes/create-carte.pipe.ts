import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema  } from 'zod';

export class CreateCartPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
        console.log("in pipie")
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } 
        catch (error) {
            throw new BadRequestException('Invalid data');
        }
    }
}
