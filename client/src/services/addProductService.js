const API_URL = process.env.REACT_APP_API_URL;

const addProduct = async (productData) => {
    const url = `${API_URL}/products`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(res => res.json())
        .then(product => {
            console.log("Product created:", product);
            return product;
        })
        .catch((error) => ({ error: error.message }));
}

export default addProduct;