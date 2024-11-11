

import Modal from "./ui/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
import useHttp from "../hooks/useHttp";



export default function Cart() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const userProgressCtx = useContext(UserProgressContext);



  function handleClose() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleClose : null}
    >
      <h2>You Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIcrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total"> {currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
