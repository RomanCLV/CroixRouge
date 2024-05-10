
export const canRegister = async (email) => {
    const url = `${process.env.REACT_APP_API_URL}/users/can-register`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
        })
    })
    .then(res => res.json())
    .then(result => {
        return result;
    })
    .catch((error) => ({ error: error.message }));
}

export const signup = async (username, email, password) => {
    const url = `${process.env.REACT_APP_API_URL}/users/register`;

    return await fetch(url, {
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
        return user;
    })
    .catch((error) => ({ error: error }));
}
