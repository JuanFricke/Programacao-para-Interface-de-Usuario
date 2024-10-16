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
    <IonCard>  
      <IonCardHeader style={{ backgroundColor: corIcon }}>
        <IonCardTitle> {nome}</IonCardTitle> 
        <IonCardSubtitle> {descricao}</IonCardSubtitle> 
        <IonImg src={fotoProfessor} alt="Foto do professor" />
      </IonCardHeader>
aaa
      <IonCardContent>
        <IonImg src={urlImg} alt="Imagem da matéria" />
      </IonCardContent>

      <div className="card-footer">
        <IonIcon className="trending-icon" icon={trendingUpOutline} /> 
        <IonIcon className="folder-icon" icon={folderOutline} />
      </div>
    </IonCard>
  );
};

export default Card;
