export const createCart = async (jwt, productId) => {
    const url = `${process.env.REACT_APP_API_URL}/carts`;
    console.log(url);
    console.log("jwt:", jwt)
    console.log("pid:", productId)

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': "Bearer " + jwt
        },
        body: JSON.stringify({productId})
    })
    .then(res => res.json())
    .catch((error) => ({ error: error }));
}

export const deleteCart = async (jwt, productId) => {
    const url = `${process.env.REACT_APP_API_URL}/carts`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': "Bearer " + jwt
        },
        body: JSON.stringify({productId})
    })
    .then(res => res.json())
    .catch((error) => ({ error: error }));
}