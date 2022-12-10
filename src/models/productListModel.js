export const getProductById = (products, id) => products.items.find(x => x.id === id);

export const addProduct = (products, product) => {
    const match = getProductById(product.id);
    if (!match) {
        products.push(product);
    }
}

export const deleteProduct = (products, productId) => {
    const newItems = products.filter(x => x.id !== productId);
    clear(products);
    for (let i = 0; i < newItems.length; i++) {
        products.push(newItems[i]);
    }
}

export const clear = (products) => {
    while (!isEmpty(products)) {
        products.pop();
    }
}

export const isEmpty = (products) => products.length === 0;
