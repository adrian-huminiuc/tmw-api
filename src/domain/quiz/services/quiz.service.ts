import { Injectable } from '@nestjs/common';
import { QuizRepository } from '../repositories/quiz.repository';
import { QuizEntity } from '../entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepo: QuizRepository) {}

  async getByName(name: string): Promise<QuizEntity> {
    return await this.quizRepo.findOneOrFail({ where: { name: name } });
  }
}
