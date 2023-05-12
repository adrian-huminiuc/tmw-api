import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('answers')
export class AnswerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  text: string;

  @Column('integer')
  weight: number;

  @ManyToOne(() => QuestionEntity, (question) => question.answers, {
    lazy: true,
    cascade: ['insert', 'update'],
  })
  question: Promise<QuestionEntity>;
}
