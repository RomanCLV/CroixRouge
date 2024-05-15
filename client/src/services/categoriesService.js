export const getCategories = async () => {
    const url = `${process.env.REACT_APP_API_URL}/categories`;

    return await fetch(url, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch((error) => ({ error: error.message }));
}