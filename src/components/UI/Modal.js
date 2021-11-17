import { Fragment } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";
import ShowModal from "../../context/ShowModal";
import { useContext } from "react";

const Backdrop = (props) => {
  const ctx = useContext(ShowModal);

  return <div onClick={ctx.onHideCart} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop />, portalElement)}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
      {/* <Backdrop />
      <ModalOverlay>{props.children}</ModalOverlay>  --- without Portal*/}
    </Fragment>
  );
};

export default Modal;
