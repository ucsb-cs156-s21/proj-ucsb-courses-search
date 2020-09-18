import React from "react";
import checkbox from "assets/checkbox.svg";
import checkboxChecked from "assets/checkbox-checked.svg";

const CheckboxButton = ({ item, index, toggle }) => {
  const handleCheckBoxClick = (e) => {
    e.preventDefault();
    toggle(index, item.id);
  };

  return (
    <button
      style={{ background: "none", border: "none" }}
      onClick={handleCheckBoxClick}
    >
      <img src={item.done ? checkboxChecked : checkbox} alt="checkbox"></img>
    </button>
  );
};

export default CheckboxButton;
