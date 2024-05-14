export const getGenders = async () => {
    const url = `${process.env.REACT_APP_API_URL}/genders`;

    return await fetch(url, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch((error) => ({ error: error.message }));
}