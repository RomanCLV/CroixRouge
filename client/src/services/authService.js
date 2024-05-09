export default auth = async (username, password) => {
    const url = `${process.env.REACT_APP_API_URL}/auth`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
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
