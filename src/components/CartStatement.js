import React from "react";

const CartStatement = (props) => {

    const values = [
        "Panier",
        "Paiement",
        "Terminé"
    ];

    return (
        <div className={"header-statement-div"}>
            {
                values.map((value, index) =>
                    <p
                        key={index}
                        className={index === props.step ? "selected" : ""}
                    >
                        {value}
                    </p>)
            }
        </div>
    );
}

export default CartStatement;
