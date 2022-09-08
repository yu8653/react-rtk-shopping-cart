import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNumItems } from "./cartSlice";
import styles from "./CartLink.module.css";

const CartLink = () => {
  const numItems = useSelector(getNumItems);

  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>
        🛒&nbsp;&nbsp;{numItems ? numItems : "Cart"}
      </span>
    </Link>
  );
};

export default CartLink;
