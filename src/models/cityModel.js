import ProductListModel from "./productListModel";

export default function CityModel(props) {

    this.name = props.name || "";
    this.image = props.image || "";
    this.productList = new ProductListModel();
}
