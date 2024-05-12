export const getCities = async (limit=null, name=null) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/status`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            'limit': limit,
            'name': name,
        }
    })
    .then(res => res.json())
    .then(cities => {
        if (!cities) {
            throw new Error("Villes non trouvées.");
        }
        else if (cities.error) {
            throw new Error(cities.error.message);
        }
        else {
            return cities;
        }
    })
    .catch((error) => ({ error: error }));
}