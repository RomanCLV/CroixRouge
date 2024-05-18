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

export const createCity = async (name, address, longitude, latitude, imagePath) => {
    const url = `${process.env.REACT_APP_API_URL}/cities/city`;

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            address: address,
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
            image: imagePath
        })
    })
    .then(res => res.json())
    .then(city => {
        if (!city) {
            throw new Error("Villes non trouvées.");
        }
        else if (city.error) {
            throw new Error(city.error.message);
        }
        else {
            return city;
        }
    })
    .catch((error) => ({ error: error }));
}