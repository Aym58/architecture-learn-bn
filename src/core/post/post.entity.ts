import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../dummy-user/dummy-user.entity';
import { ProjectEntity } from '../project/project.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  text: string;

  @CreateDateColumn()
  createDate: string;

  @ManyToOne(() => UserEntity, (user) => user.post)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.post)
  @JoinColumn()
  project: ProjectEntity;
}
