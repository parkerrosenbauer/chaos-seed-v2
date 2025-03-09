import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ChaosSeed } from '../interfaces';

@Injectable()
export class ChaosSeedById implements PipeTransform<string, string> {
  transform(value: string, _metadata: ArgumentMetadata) {
    return 'fix this when you have the DB set up';
  }
}
