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
    console.log(url)
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
    console.log(url)
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch((error) => ({ error: error }));
}