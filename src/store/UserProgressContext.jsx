import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: '',
  showCart: () => {},
  hideCart : ()=> {},
  showCheckout : () => {},
  hideCheckout : () => {},
});

export function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState('');

  const showCart = () => {
    setProgress('cart');
  };

  const hideCart = () => {
    setProgress('');
  };

  const showCheckout = () => {
    setProgress('checkout');
  };

  const hideCheckout = () => {
    setProgress('');
  };

  const userProgressContext = {
    progress : progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;