import React from 'react'; // Add this import
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonIcon } from '@ionic/react';
import { folderOutline, trendingUpOutline } from 'ionicons/icons'; // Importing Ionic icons
import './index.module.css'; // Use this to handle your custom styles

interface CardProps {
  nome: string;
  descricao?: string;
  fotoProfessor?: string;
  urlImg?: string;
  corIcon?: string;
}

const Card: React.FC<CardProps> = ({
  nome,
  descricao = '',
  fotoProfessor = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  urlImg = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  corIcon = "#1976d2"
}) => {
  return (
    <IonCard className="card-container">
      <IonCardHeader className="card-header" style={{ backgroundColor: corIcon }}>
        <IonCardTitle className="card-title">{nome}</IonCardTitle> {/* Nome da matéria */}
        <IonCardSubtitle className="card-description">{descricao}</IonCardSubtitle> {/* Nome do professor */}
        <IonImg className="card-image" src={fotoProfessor} alt="Foto do professor" /> {/* Foto do professor */}
      </IonCardHeader>

      <IonCardContent className="card-body">
        <IonImg className="card-cover" src={urlImg} alt="Imagem da matéria" /> {/* Imagem da matéria (foto de capa) */}
      </IonCardContent>

      <div className="card-footer">
        <IonIcon className="trending-icon" icon={trendingUpOutline} /> {/* Icon with Ionic's icon system */}
        <IonIcon className="folder-icon" icon={folderOutline} /> {/* Icon with Ionic's icon system */}
      </div>
    </IonCard>
  );
};

export default Card;
