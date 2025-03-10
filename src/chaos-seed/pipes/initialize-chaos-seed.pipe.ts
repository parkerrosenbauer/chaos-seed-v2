import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ChaosSeed } from '../models/chaos-seed.model';

@Injectable()
export class InitializeChaosSeed
  implements PipeTransform<ChaosSeed, ChaosSeed>
{
  transform(value: ChaosSeed, _metadata: ArgumentMetadata): ChaosSeed {
    value.name = this.cleanName(value.name);
    // assign random attributes too
    return value;
  }

  private assignRandomAttribute() {
    return 'attribute';
  }

  private cleanName(name: string) {
    return name
      .replace(/[^a-zA-Z\s]/g, '')
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
