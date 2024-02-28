import { TaskConstants, TaskStatus } from '@domain/Task';
import { IsEnum, IsOptional, Length } from 'class-validator';

export class UpdateTaskInput {
  @IsOptional()
  @Length(
    TaskConstants.TASK_DESCRIPTION_MIN_LEN,
    TaskConstants.TASK_DESCRIPTION_MAX_LEN,
  )
  description?: string;

  @IsOptional()
  @IsEnum(Object.values(TaskStatus))
  status?: TaskStatus;
}
