import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  chectoutCart,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from "./cartSlice";
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(getTotalPrice);
  const checkoutstate = useSelector((state) => state.cart.checkoutState);
  const errorMessage = useSelector((state) => state.cart.errorMessage);

  const onQuantityChange = (e, id) => {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ id, quantity }));
  };

  const onCheckout = (e) => {
    e.preventDefault();
    dispatch(chectoutCart());
    setTimeout(() => {
      dispatch({ type: "cart/checkout/fulfilled" });
    }, 500);
  };

  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutLoading]: checkoutstate === "LOADING",
    [styles.checkoutError]: checkoutstate === "ERROR",
  });

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id, quantity]) => (
            <tr key={id}>
              <td>{products[id].name}</td>
              <td>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={quantity}
                  onBlur={(e) => onQuantityChange(e, id)}
                />
              </td>
              <td>${products[id].price}</td>
              <td>
                <button
                  aria-label={`Remove ${products[id].name} from Shopping Cart`}
                  onClick={() => dispatch(removeFromCart(id))}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={onCheckout}>
        {checkoutstate === "ERROR" && errorMessage ? (
          <p className={styles.errorBox}>{errorMessage}</p>
        ) : null}
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
};

export default Cart;
