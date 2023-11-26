import { PRODUCTS } from "../../products";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { checkout, selectTotalCartAmount } from "../../state/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsTotalAmount = useSelector(selectTotalCartAmount);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div>
        <h1>Your cart items</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return (
              <CartItem key={product.id} data={product} cartItems={cartItems} />
            );
          }
        })}
      </div>

      {cartItemsTotalAmount > 0 ? (
        <div className="checkout">
          <p style={{ textAlign: "center", fontWeight: "600" }}>
            {" "}
            Subtotal: ${cartItemsTotalAmount}{" "}
          </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              dispatch(checkout());
              navigate("/");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h2> Your Shopping Cart is Empty</h2>
      )}
    </div>
  );
};
export default Cart;
