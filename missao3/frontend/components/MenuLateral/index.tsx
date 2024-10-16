import React from 'react';
import { useState } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAccordion,
  IonAccordionGroup,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { homeOutline, calendarOutline, peopleOutline, settingsOutline, schoolOutline, arrowDown, arrowForward } from "ionicons/icons";
import './index.module.css'; // Update your styles for Ionic

interface Turma {
  titulo: string;
  corIcon: string;
}

interface MenuLateralProps {
  open: boolean;
  turmas: Turma[];
}

const MenuLateral: React.FC<MenuLateralProps> = ({ open, turmas }) => {
  const [hover, setHover] = useState(false);
  const menuOpen = open || hover;
  const [subMenuOpen, setSubMenu] = useState(false);

  return (
    <IonContent
      className={`menuLateral ${menuOpen ? 'open' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonList>
        <IonItem href="#" className="containerIcon">
          <IonIcon icon={homeOutline} />
          {menuOpen && <IonLabel className="descriptionTurma">Início</IonLabel>}
        </IonItem>
        
        <IonItem href="#" className="containerIcon">
          <IonIcon icon={calendarOutline} />
          {menuOpen && <IonLabel className="descriptionTurma">Agenda</IonLabel>}
        </IonItem>

        <IonItem href="#" className="containerIcon">
          <IonIcon icon={schoolOutline} />
          {menuOpen && <IonLabel className="descriptionTurma">Turmas</IonLabel>}
        </IonItem>

        <div className="divider"></div>

        <IonItem href="#" className="containerIcon">
          <IonIcon icon={peopleOutline} />
          {menuOpen && <IonLabel className="descriptionTurma">Estudantes</IonLabel>}
        </IonItem>

        <div className="divider"></div>

        <IonAccordionGroup>
          <IonAccordion value="submenu" onClick={() => setSubMenu(!subMenuOpen)}>
            <IonItem className="containerIcon">
              <IonIcon icon={subMenuOpen ? arrowDown : arrowForward} />
              <IonIcon icon={schoolOutline} />
              {menuOpen && <IonLabel className="descriptionTurma">Minhas inscrições</IonLabel>}
            </IonItem>
            {subMenuOpen && (
              <div>
                <IonItem href="#" className="containerIcon">
                  <IonIcon icon={settingsOutline} />
                  {menuOpen && <IonLabel className="descriptionTurma">Pendentes</IonLabel>}
                </IonItem>
                {turmas.length > 0 && turmas.map(({ titulo, corIcon }, index) => (
                  <IonItem href="#" className="containerIcon" key={index}>
                    <span
                      className="iconTurma"
                      style={{ backgroundColor: corIcon }}
                    ></span>
                    {menuOpen && <IonLabel className="descriptionTurma">{titulo}</IonLabel>}
                  </IonItem>
                ))}
              </div>
            )}
          </IonAccordion>
        </IonAccordionGroup>

        <div className="divider"></div>

        <IonItem href="#" className="containerIcon">
          <IonIcon icon={settingsOutline} />
          {menuOpen && <IonLabel className="descriptionTurma">Configurações</IonLabel>}
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default MenuLateral;
