function ProductModel (props) {

        const uuidv4 = require("uuid/v4");

        this.id = uuidv4();
        this.name = props.name || "";
        this.description =  props.description || ""
        this.price =  props.price || "";
        this.size =  props.size || "";
        this.image = props.image || "";
}