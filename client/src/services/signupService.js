
const signup = async (username, email, password) => {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    console.log(url);

    return await await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
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