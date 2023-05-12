import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { QuizEntityToDtoFactory } from '../factories/quiz.entity-to-dto.factory';
import { QuizDto } from '../dtos/quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly quizFactory: QuizEntityToDtoFactory,
  ) {}

  @Get(':name')
  async getQuizByName(@Param('name') name: string): Promise<QuizDto> {
    return this.quizFactory.getDto(await this.quizService.getByName(name));
  }
}
