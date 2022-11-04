import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PostEntity } from '../post.entity';

export const GetPost = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    console.log('Hello from decorator');
    const post: PostEntity = context.switchToHttp().getRequest().post;

    return data ? post && post[data] : post;
  },
);
