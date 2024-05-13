import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../cities/city.entity';
import { User } from '../users/user.entity';

@Entity("city_admins")
export class CityAdmin {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => City)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
