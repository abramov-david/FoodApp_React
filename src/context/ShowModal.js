import React, { useState } from "react";

const ShowModal = React.createContext({
  cartShowStatus: false,
  onShowCart: () => {},
  onHideCart: () => {},
});

export const ModalProvider = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartShownHandler = () => {
    setCartIsShown(false);
  };
  return (
    <ShowModal.Provider
      value={{
        cartShowStatus: cartIsShown,
        onShowCart: showCartHandler,
        onHideCart: hideCartShownHandler,
      }}
    >
      {props.children}
    </ShowModal.Provider>
  );
};

export default ShowModal;
