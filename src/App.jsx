import { Routes, Route, Link } from "react-router-dom";
import Products from "./features/product/Products";
import CartLink from "./features/cart/CartLink";
import Cart from "./features/cart/Cart";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.app}>
        <header className={styles.header}>
          <nav>
            <Link className={styles.navLink} to="/">
              Home
            </Link>
            <Link className={styles.navLink} to="/products">
              Products
            </Link>
            <CartLink />
          </nav>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </>
  );
}

export default App;

function Home() {
  return (
    <>
      <main className="page">
        <h1>Welcome to the Store</h1>
        <figure>
          <img src="/store.jpg" alt="A large old storefront" width="100%" />
          <figcaption>
            <a href="https://www.freepik.com/free-vector/shop-with-sign-we-are-open_8422313.htm#query=shop%20store&position=0&from_view=keyword">
              Image by pikisuperstar
            </a>{" "}
            on Freepik
          </figcaption>
        </figure>
      </main>
      <footer className={styles.footer}>
        <span>
          <a
            href="https://vitejs.dev/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src="/vite.svg" alt="Vite" />
          </a>
        </span>
        <span>
          <a
            href="https://redux.js.org/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src="/redux.png" alt="redux" />
          </a>
        </span>
      </footer>
    </>
  );
}
