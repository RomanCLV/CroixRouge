import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { City } from '../cities/city.entity';
import { User } from '../users/user.entity';

@Entity()
export class CityAdmin {

    /**
     * ! This is a fake attribute
     * This is a workaround for TypeORM's `MissingPrimaryColumnError`
     **/
    @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
    id: never;

    @ManyToOne(() => City)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
