import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 16, unique: true })
    category: string;
}
