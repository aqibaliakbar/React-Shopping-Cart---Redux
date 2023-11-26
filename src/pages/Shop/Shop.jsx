import "./shop.css";
import { PRODUCTS } from "../../products";
import {Product} from "./Product"
import { useSelector } from "react-redux";

const Shop = () => {
  // Access the cart state from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className="shop">
      <div className="shop-title">
        <h1>AQ-ECOMMERCE SHOP</h1>
      </div>
      <div className="products">
        {PRODUCTS.map((product) => {
          return <Product key={product.id} data={product} cartItems={cartItems} />;
        })}
      </div>
    </div>
  );
};

export default Shop;
