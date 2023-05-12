export class AnswersQuestionDto {
  id: number;
  text: string;
}

export class QuizQuestionDto {
  id: number;
  text: string;
  answers: AnswersQuestionDto[];
}

export class QuizDto {
  id: number;
  name: string;
  description: string;
  questions: QuizQuestionDto[];
}
