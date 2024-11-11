import Modal from "./ui/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfing = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfing);


  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };

  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.cleanCart();
   clearData();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button> 
    </>
  );

  if (isSending) {
    actions = <span>Sending order data ...</span>;
  }

  if(data && !error){
    return(
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose} >
      <h2>Success</h2>
      <p>Order sent</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Close</Button>
      </p>
    </Modal>
    )
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amoount :{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Adress" id="email" type="email" />
        <Input label="street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error message={error} title="Fails to submit order" />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
