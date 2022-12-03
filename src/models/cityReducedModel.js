export default function CityReducedModel(city) {
    this.id = city.id;
    this.name = city.name;
    this.image = city.image;
    this.productsCount = city.productsCount();
}