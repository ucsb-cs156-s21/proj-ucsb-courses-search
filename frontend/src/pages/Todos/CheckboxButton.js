import React from "react";
import checkbox from "assets/checkbox.svg";
import checkboxChecked from "assets/checkbox-checked.svg";

const CheckboxButton = ({ item, toggle }) => {
  const handleCheckBoxClick = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...item,
      done: !item.done,
    };
    toggle(updatedItem, updatedItem.id);
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
