import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/react';
import Api from './api';

const App = () => {
  const fetchData = async () => {
    const data = await Api.get('/data'); // Exemplo de chamada para a API
    console.log(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Bem-vindo ao Ionic React!</h1>
      </IonContent>
    </IonPage>
  );
};

export default App;
