import CityModel from "../models/cityModel";
import ProductModel from "../models/productModel";

export const CATEGORIES = {
    TSHIRT: "t-shirt",
    SWEAT: "sweat",
    PANTS: "pants",
    JACKET: "jacket",
    COAT: "coat",
    SHOES: "shoes"
};

export const SIZE = {
    XS: "XS",
    S: "S",
    M: "M",
    L: "L",
    XL: "XL",
    XXL: "XXL",
    XXXL: "> XXL"
}

const data = {
    cities: [
        new CityModel({
            name: "Bayonne",
            image: ""
        }),
        new CityModel({
            name: "Biarritz",
            image: ""
        }),
        new CityModel({
            name: "Paris",
            image: ""
        })
    ],
    products: [
        new ProductModel({
            category: CATEGORIES.TSHIRT,
            name: "T-shirt bleu Nike",
            description: "Bon état et peu porté.",
            creationDate: new Date(2022, 10, 17),
            price: 20.0,
            size: SIZE.L,
        }),
        new ProductModel({
            category: CATEGORIES.PANTS,
            name: "Jeans Levis",
            description: "Etat très correct, jamais porté.",
            creationDate: new Date(2022, 10, 15),
            price: 25.0,
            size: SIZE.XL,
        }),
    ]
};

export function generateData() {
    // TODO : generate product list for each city
}

// TODO : Delete export
export function fetchData() {
    return data;
}

// TODO : Delete export
export function getProducts() {
    return fetchData().products;
}

//TODO : Delete export
export function getCities() {
    return fetchData().cities;
}

export function getNameCities() {
    return fetchData().cities.map(x => x.name);
}

export function getCity(cityName) {
    return data.cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
}

export function getProductsByCity(cityName) {
    const city = getCity(cityName);

    return city ? city.productList : [];
}

export function getProductById(id) {

}

