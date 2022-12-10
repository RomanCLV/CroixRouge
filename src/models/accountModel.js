import {v4} from "uuid";

const AccountModel = props => {
    return {
        id: v4(),
        username: props.username || "",
        email: props.email || "",
        password: props.password || "",
        avatar: props.avatar || ""
    };
}

export const getWithoutPassword = (account) => {
    return {
        id: account.id,
        username: account.username,
        email: account.email,
        avatar: account.avatar
    }
}

export default AccountModel;