import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import Button from "./ui/Button";

function Header() {
  const cartCtx = useContext(CartContext);
  const totalNumberOfItems = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>React Food App</h1>
      </div>
      <nav>
        <Button textOnly>Cart({totalNumberOfItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
