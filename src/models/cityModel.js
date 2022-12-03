import ProductListModel from "./productListModel";
import { v4 } from "uuid";

export default function CityModel(props) {

    this.id = v4();
    this.name = props.name || "";
    this.image = props.image || "";
    this.productList = new ProductListModel();

    this.productsCount = () => this.productList.count();
}
