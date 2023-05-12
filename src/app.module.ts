import { Module } from '@nestjs/common';
import { QuizModule } from './domain/quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './core/orm/data-source';

@Module({
  imports: [
    QuizModule,
    TypeOrmModule.forRoot({ ...options, autoLoadEntities: true }),
  ],
})
export class AppModule {}
