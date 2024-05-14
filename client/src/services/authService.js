export const auth = async (username, password) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;

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
        if (!user || user.error) {
            throw new Error("Identifiants incorrects.");
        }
        else {
            return user;
        }
    })
    .catch(error => ({ error: error }));
}

export const status = async (jwt) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/status`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    .then(res => res.json())
    .then(result => {
        if (!result || result.error) {
            throw new Error("Session expirée.");
        }
        else {
            return result;
        }
    })
    .catch((error) => ({ error: error }));
}
