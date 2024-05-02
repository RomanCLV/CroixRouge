import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class SuperAdmin {
    
    /**
     * ! This is a fake attribute
     * This is a workaround for TypeORM's `MissingPrimaryColumnError`
     **/
    @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
    id: never;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}