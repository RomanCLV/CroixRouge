export const getCities = async (limit=null, name=null) => {
    const url = `${process.env.REACT_APP_API_URL}/cities`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            limit: limit,
            name: name,
        })
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

export const getCitiesCoordinates = async () => {
    const url = `${process.env.REACT_APP_API_URL}/cities/coordinates`;

    return await fetch(url, {
        method: 'GET'
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