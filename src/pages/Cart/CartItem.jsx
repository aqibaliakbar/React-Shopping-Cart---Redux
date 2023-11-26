import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartItemCount,
} from "../../state/cartSlice";

const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className="cartItem">
        <img src={productImage} alt="" />
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p>${price}</p>
          <div className="countHandler">
            <button onClick={() => dispatch(removeFromCart(id))}>-</button>
            <input
              value={cartItems[id]}
              onChange={(e) =>
                dispatch(
                  updateCartItemCount({
                    itemId: id,
                    newAmount: Number(e.target.value),
                  })
                )
              }
            />
            <button onClick={() => dispatch(addToCart(id))}>+</button>
          </div>
        </div>
      </div>
    </>
  );
};



export default CartItem;
