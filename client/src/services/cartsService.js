export const createCart = async (jwt, productId) => {
    const url = `${process.env.REACT_APP_API_URL}/carts`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt
        },
        body: JSON.stringify({productId})
    })
    .then(res => res.json())
    .catch((error) => ({ error: error }));
}

export const getCarts = async (jwt) => {
    const url = `${process.env.REACT_APP_API_URL}/carts`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt
        }
    })
    .then(res => res.json())
    .catch((error) => ({ error: error }));
}

export const deleteCart = async (jwt, productId) => {
    const url = `${process.env.REACT_APP_API_URL}/carts`;

    return await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt
        },
        body: JSON.stringify({productId})
    })
    .then(res => res.json())
    .catch((error) => ({ error: error }));
}

export const deleteCartOfUser = async (jwt) => {
    const url = `${process.env.REACT_APP_API_URL}/carts/user`;

    return await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt
        },
    })
    .then(res => res.json())
    .catch((error) => ({ error: error }));
}