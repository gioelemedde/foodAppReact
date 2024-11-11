import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";

function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalNumberOfItems = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>React Food App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart({totalNumberOfItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
