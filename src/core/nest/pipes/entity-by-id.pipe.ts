import { EntityManager } from 'typeorm';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { isString } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class EntityByIdPipe implements PipeTransform {
  constructor(readonly em: EntityManager) {}

  async transform(value: string, metadata: ArgumentMetadata): Promise<object> {
    if (!metadata.metatype) {
      throw new Error(
        `The @Param must specify an entity type. Ex: @Param('id', EntityByIdPipe) provider: QuizEntity`,
      );
    }

    if (!isString(value)) {
      throw new BadRequestException('search value must be a string');
    }

    const entity = await this.em.findOne(metadata.metatype, {
      where: { id: Number(value) },
    });

    if (!entity || !entity.id || entity.id !== Number(value)) {
      throw new NotFoundException(`Cannot find resource with id [${value}]`);
    }

    return entity;
  }
}
