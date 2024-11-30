import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }

  transform(value: unknown) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException(
        {
          validationError: true,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
