import { v4 } from "uuid";

export default function ProductModel (props) {

        this.id = v4();
        this.cityId = props.cityId || null;
        this.category = props.category || "";
        this.name = props.name || "";
        this.gender = props.gender || "";
        this.vestingState = props.vestingState || 0;
        this.description = props.description || "";
        this.creationDate = props.creationDate || new Date();
        this.price =  props.price || 0.0;
        this.size =  props.size || "";
        this.images = props.images || [];
}