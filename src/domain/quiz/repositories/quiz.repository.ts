import { DataSource, Repository } from 'typeorm';
import { QuizEntity } from '../entities/quiz.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizRepository extends Repository<QuizEntity> {
  constructor(readonly dataSource: DataSource) {
    super(QuizEntity, dataSource.createEntityManager());
  }
}
