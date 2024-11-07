import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemsIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateItems = [...state.items];
    if (existingCartItemsIndex > -1) {
      const existingItems = state.items[existingCartItemsIndex];
      const updateItem = {
        ...existingItems,
        quantity: existingItems.quantity + 1,
      };
      updateItems[existingCartItemsIndex] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    return {
      ...state,
      items: updateItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemsIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemsIndex];
    const updateItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updateItems.splice(existingCartItemsIndex, 1);
      return {
        ...state,
        items: updateItems,
      };
    } else {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updateItems[existingCartItemsIndex] = updateItem;
    }
    return {
      ...state,
      items: updateItems,
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

 function addItem(item) {
    dispatchCartAction({type: "ADD_ITEM", item});
 }

  function removeItem(item) {
    dispatchCartAction({type: "REMOVE_ITEM", item});
  }

  const cartContext= {
    items : cart.items,
    addItem,
    removeItem
  }

  console.log(cartContext);
  
  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
