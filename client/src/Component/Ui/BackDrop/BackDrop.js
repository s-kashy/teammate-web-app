import React from "react";
import "./BackDrop.css"
const BackDrop = props => {
  return props.visible ? (
    <div className="Backdrop" onClick={props.modalClosed} />
  ) : null;
};
export default BackDrop;