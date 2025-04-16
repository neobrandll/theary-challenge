import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToOne(() => Tree, (tree) => tree.children, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  parent?: Tree;

  @OneToMany(() => Tree, (tree) => tree.parent, { cascade: true })
  children: Tree[];
}
