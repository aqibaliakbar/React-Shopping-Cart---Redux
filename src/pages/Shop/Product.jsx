import { useDispatch } from "react-redux";
import { addToCart } from "../../state/cartSlice";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems } = props;
  const dispatch = useDispatch();

  const cartItemsAmount = cartItems[id];
  return (
    <div className="product">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBtn" onClick={() => dispatch(addToCart(id))}>
        Add To Cart {cartItemsAmount > 0 && `(${cartItemsAmount})`}
      </button>
    </div>
  );
};
