const API_URL = process.env.REACT_APP_API_URL;

export const addProduct = async (productData) => {
    const url = `${API_URL}/products`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(res => res.json())
        .catch((error) => ({ error: error }));
}

export const searchProducts = async (query) => {
    const url = `${API_URL}/products/search/${query}`;
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch((error) => ({ error: error }));
}

export const getProductById = async (id) => {
    const url = `${API_URL}/products/${id}`;
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch((error) => ({ error: error }));
}

export const pay = async (productIds) => {
    const url = `${API_URL}/products/pay`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({products: productIds})
    })
        .then(res => res.json())
        .catch((error) => ({ error: error }));
}