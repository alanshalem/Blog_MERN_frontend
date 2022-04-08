import React from "react";

export default function ComboBox({ name, list, value, onChange, hidden }) {
  return (
    <div className={hidden ? "combo-box" : "combo-box show"}>
      <select
        className="post-input border-transparent"
        type="text"
        id={name}
        value={value}
        placeholder={name}
        onChange={onChange}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
