import {getCities} from "../../data/data";

export async function citiesLoader () {

    let cities = getCities();
    cities = cities.sort((a, b) => a.name.localeCompare(b.name));
    return cities;
}