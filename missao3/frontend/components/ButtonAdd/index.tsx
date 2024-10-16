import React, { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons"; // Importing Ionic icon
import "./index.module.css"; // Use this to handle your custom styles

interface ButtonAddProps {
  backendAddress: string;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ backendAddress }) => {
  const [data, setData] = useState({ message: "hello, server!" });

  const handleButtonClick = async () => {
    try {
      console.log("Adding a new class");
      const response = await fetch(backendAddress + "receive_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Class Added");
        console.log("success:", result);
      } else {
        console.error("error:", response.statusText);
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  return (
    <IonButton expand="full" onClick={handleButtonClick} className="add-new-card-button">
      <IonIcon icon={addOutline} slot="start" /> {/* Ionic icon */}
      Add Class
    </IonButton>
  );
};

export default ButtonAdd;
