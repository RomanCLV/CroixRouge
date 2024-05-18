import React from "react";

export const getPriceToDisplay = (price) => {
    const unit = Math.round(price)
    const decimal = Math.round((price - unit) * 100);

    if (decimal === 0) {
        return price.toString() + ".00";
    }
    else if (decimal % 10 === 0) {
        return price.toString() + "0";
    }
    return price.toString();
}

const CartTicket = (props) => {
    const products = props.products || [];

    let totalPrice = products.map(p => p ? p.price : 0).reduce((a, b) => a + b, 0);
    if (totalPrice !== Math.round(totalPrice)) {
        // si on a des décimales
        const price = Math.round(totalPrice)
        const decimal = Math.round((totalPrice - price) * 100);
        totalPrice = price + decimal / 100;
    }

    return (
        <div className={"cart-ticket"}>
            <div>
                {
                    products.map((product, index) =>
                        <div key={index} className={"d-flex justify-content-between"}>
                            <p>{product ? product.title : "Produit supprimé"}</p>
                            <p>{getPriceToDisplay(product ? product.price : 0)} €</p>
                        </div>
                    )
                }
            </div>
            <div className={"d-flex justify-content-between border-top"}>
                <p className={"cart-ticket-total"}>Total</p>
                <p className={"cart-ticket-total price-text"}>{getPriceToDisplay(totalPrice)} €</p>
            </div>
        </div>
    );
}

export default CartTicket