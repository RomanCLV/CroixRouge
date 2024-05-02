import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("api_keys")
export class ApiKey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    apiKey: string;
}
