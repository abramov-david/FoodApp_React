import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  ///Forward Ref allow to use 'ref' in reusable component <input/>
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
