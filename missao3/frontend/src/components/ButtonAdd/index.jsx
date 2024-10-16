import React, { useState } from "react";
import styles from "./index.module.css";

export default function ButtonAdd({ backendAddress }) {
  const [data, setData] = useState({ message: "hello, server!" });

  const handleButtonClick = async () => {
    try {
      console.log("Adding a new class");
      const response = await fetch(backendAddress+"receive_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Class Added")
        console.log("success:", result);
      } else {
        console.error("error:", response.statusText);
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  return (
    <button className={styles.addNewCardButton} onClick={handleButtonClick}>
      <img
        className={styles.addNewCardButtonImg}
        src="../imgs/add-icon.svg"
        alt="add icon"
      />
    </button>
  );
}
