import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("sizes")
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 4, unique: true })
    size: string;
}
