import React from "react";
import "./CustomAlert.css"
const CustomAlert = ({ style, message, close }) => {
  return (
    <div
      className="alertdiv"
      style={{
        ...style,
        backgroundColor: "rgba(287, 187, 207, 0.667)",
        color: "#721c24",
        padding: "10px",
        borderRadius: "15px",
        fontFamily: "monospace",
        // border: "1px solid #f5c6cb",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{message}</span>
        <button
        className="closebutton"
          onClick={close}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#721c24",
            cursor: "pointer",
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
