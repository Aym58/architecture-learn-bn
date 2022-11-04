import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ProjectEntity } from '../project.entity';

export const GetProject = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const project: ProjectEntity = context.switchToHttp().getRequest().project;

    return data ? project && project[data] : project;
  },
);
