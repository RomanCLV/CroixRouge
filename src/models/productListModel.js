export default function ProductListModel() {

    this.items = [];

    this.getProductById = (id) => this.items.find(x => x.id === id);

    this.addProduct = (product) => {
        const match = this.getProductById(product.id);
        if (!match) {
            this.items.push(product);
        }
    }

    this.deleteProduct = (productId) => {
        const newItems = this.items.filter(x => x.id !== productId);
        this.clear();
        for (let i = 0; i < newItems.length; i++) {
            this.items.push(newItems[i]);
        }
    }

    this.clear = () => {
        while (this.items.length > 0) {
            this.items.pop();
        }
    }

    this.isEmpty = () => this.items.length === 0;
}