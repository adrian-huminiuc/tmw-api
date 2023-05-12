import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizEntity } from './quiz.entity';
import { AnswerEntity } from './answer.entity';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  text: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions, {
    lazy: true,
    cascade: ['insert', 'update'],
  })
  quiz: Promise<QuizEntity>;

  @OneToMany(() => AnswerEntity, (answer) => answer.question, {
    lazy: true,
    cascade: ['insert', 'update'],
  })
  answers: Promise<AnswerEntity[]>;
}
