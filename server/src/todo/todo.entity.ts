import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate } from 'typeorm';

@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;

    @Column({ default: '' })
    description: string;

    @Column({ type: 'boolean', default: false })
    completed: boolean;
}