import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from '@ionic/react';
import { menuOutline, addOutline, appsOutline, personCircleOutline } from 'ionicons/icons';
import './index.module.css'; // Refactor your styles for Ionic

interface MenuProps {
  open: boolean;
  menuOpen: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ open, menuOpen, setOpenModal }) => {
  return (
    <>
      <IonHeader className="menuContainer">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => menuOpen(!open)}>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
          
          <IonTitle className="menuTitle">
            Google Sala de Aula
          </IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setOpenModal(true)}>
              <IonIcon icon={addOutline} />
            </IonButton>

            <IonButton>
              <IonIcon icon={appsOutline} />
            </IonButton>

            <IonButton>
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Menu;
