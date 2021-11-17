import React, { useContext } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import ShowModal from "./context/ShowModal";
import CartProvider from "./context/CartProvider";

function App() {
  const ctxModal = useContext(ShowModal);

  return (
    <CartProvider>
      {ctxModal.cartShowStatus && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
