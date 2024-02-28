// // CartContext.js
// import React, { createContext, useContext, useReducer } from 'react';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const initialState = { cart: [] };

//   function cartReducer(state, action) {
//     switch (action.type) {
//       case 'ADD_TO_CART':
//         const productId = action.payload.id;
//         const existingProductIndex = state.cart.findIndex((item) => item.id === productId);

//         if (existingProductIndex !== -1) {
//           const updatedCart = [...state.cart];
//           updatedCart[existingProductIndex].quantity += 1;
//           return { cart: updatedCart };
//         } else {
//           return { cart: [...state.cart, { ...action.payload, quantity: 1 }] };
//         }

//       // Thêm các action khác nếu cần
//       default:
//         return state;
//     }
//   }

//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }
