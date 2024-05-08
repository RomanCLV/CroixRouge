import { cryptePassword } from "./cryptePasswordService";

export default auth = async (username, password) => {
    const API_URL = process.env.API_URL;
    const url = `${API_URL}/auth`;
    const hashedPassword = await cryptePassword(password);

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: hashedPassword
        })
    })
    .then(res => res.json())
    .then(user => {
        console.log("auth:")
        console.log(user)
        if (!user) {
            throw new Error("Identifiants incorrects.");
        }
        return user;
    })
    .catch((error) => ({ error: error.message }));
}
