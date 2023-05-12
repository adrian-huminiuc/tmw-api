import { Injectable } from '@nestjs/common';
import { QuizEntity } from '../entities/quiz.entity';
import { AnswersQuestionDto, QuizDto, QuizQuestionDto } from '../dtos/quiz.dto';

@Injectable()
export class QuizEntityToDtoFactory {
  async getDto(quiz: QuizEntity): Promise<QuizDto> {
    const dto = new QuizDto();
    dto.id = quiz.id;
    dto.name = quiz.name;
    dto.description = quiz.description;

    const questionsDto = await Promise.all(
      ((await quiz.questions) ?? []).map(async (it) => {
        const dto = new QuizQuestionDto();
        dto.id = it.id;
        dto.text = it.text;

        dto.answers = await Promise.all(
          ((await it.answers) ?? []).map(
            async (answer) =>
              ({
                id: answer.id,
                text: answer.text,
              } as AnswersQuestionDto),
          ),
        );
        return dto;
      }),
    );

    dto.questions = questionsDto;
    return dto;
  }
}
