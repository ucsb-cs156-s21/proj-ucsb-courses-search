import React from "react";
import checkbox from "main/assets/checkbox.svg";
import checkboxChecked from "main/assets/checkbox-checked.svg";

const CheckboxButton = ({ item, index, toggle }) => {
  const handleCheckBoxClick = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...item,
      done: !item.done,
    };
    toggle(updatedItem, item.id);
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
