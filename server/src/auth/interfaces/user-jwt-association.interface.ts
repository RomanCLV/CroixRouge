import { User } from "src/users/user.entity";

export interface UserJWTAssociation {
    user: User;
    jwt: string;
}