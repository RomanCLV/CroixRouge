import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("genders")
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 16 })
    gender: string;
}
