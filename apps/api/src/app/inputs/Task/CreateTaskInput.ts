import { TaskConstants, TaskStatus } from '@domain/Task';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskInput {
  @IsString()
  @Length(
    TaskConstants.TASK_DESCRIPTION_MIN_LEN,
    TaskConstants.TASK_DESCRIPTION_MAX_LEN,
  )
  description: string;

  @IsOptional()
  @IsEnum(Object.values(TaskStatus))
  status?: TaskStatus;
}
