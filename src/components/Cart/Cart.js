import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import ShowModal from "../../context/ShowModal";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { Fragment } from "react";

const Cart = (props) => {
  const [isChekOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorSubmittingText, setErrorSubmittingText] = useState();
  const [errorSubmitting, setErrorSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const modalCtx = useContext(ShowModal);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://food-react-app-8c353-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );
      if (!response.ok) {
        throw new Error("Something go whrong!");
        setErrorSubmitting(true);
      }
      setDidSubmit(true);
      setIsSubmitting(false);
      cartCtx.clearCart();
    } catch (error) {
      setErrorSubmitting(true);
      setErrorSubmittingText(error.message);
      setIsSubmitting(false);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={modalCtx.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isChekOut && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={modalCtx.onHideCart}
        />
      )}
      {!isChekOut && modalActions}
      {errorSubmitting && (
        <p className={classes.invalid}>{errorSubmittingText}</p>
      )}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={modalCtx.onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
