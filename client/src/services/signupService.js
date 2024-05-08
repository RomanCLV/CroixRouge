import { cryptePassword } from "./cryptePasswordService";

const signup = async (username, email, password) => {
    const API_URL = process.env.API_URL;
    console.log("API_URL", process.env.API_URL)
    const url = `localhost:3001/users`;
    console.log('url:', url)

    const hashedPassword = await cryptePassword(password);

    return await await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: hashedPassword
        })
    })
    .then(res => res.json())
    .then(user => {
        console.log("user created:")
        console.log(user)
        return user;
    })
    .catch((error) => ({ error: error.message }));
}

export default signup;