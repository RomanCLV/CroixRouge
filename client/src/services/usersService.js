export const updateImage = async (jwt, imagePath) => {
    const url = `${process.env.REACT_APP_API_URL}/users/image`;

    return await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify({
            imagePath: imagePath,
        })
    })
    .then(res => res.json())
    .catch((error) => ({ error: error.message }));
}

export const isSuperAdmin = async (jwt) => {
    const url = `${process.env.REACT_APP_API_URL}/users/is-super-admin`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
    })
    .then(res => res.json())
    .catch((error) => ({ error: error.message }));
}

export const isAdmin = async (jwt, city) => {
    const url = `${process.env.REACT_APP_API_URL}/users/is-admin/${city}`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
    })
    .then(res => res.json())
    .catch((error) => ({ error: error.message }));
}