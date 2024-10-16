import React from 'react';
import { useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
} from "@ionic/react";
import './index.module.css'

interface ModalProps {
  isOpen: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpenModal }) => {
  const [value, setValue] = useState('');

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => setOpenModal(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Participar da turma</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Código da turma:</IonLabel>
            <IonInput
              type="text"
              placeholder="Digite o código da turma"
              value={value}
              onIonChange={(event) => setValue(event.detail.value!)}
            />
          </IonItem>
          <p>Peça para seu professor o código da turma e digite-o aqui.</p>

          <div>
            Para fazer login com o código da turma
            <ul>
              <li>Use uma conta autorizada.</li>
              <li>Use um código da turma, com cinco a sete letras ou números, sem espaços ou símbolos.</li>
            </ul>
            <p>
              Se tiver problemas para participar da turma, consulte este{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://support.google.com/edu/classroom/answer/6020297?hl=pt-BR&authuser=0#zippy=%2Cesqueci-ou-perdi-o-c%C3%B3digo-da-turma%2Cmeu-c%C3%B3digo-da-turma-n%C3%A3o-funciona"
              >
                artigo da Central de Ajuda
              </a>.
            </p>
          </div>
        </IonList>
      </IonContent>

      <div className="modal-footer">
        <IonButton expand="full" color="medium" onClick={() => setOpenModal(false)}>
          Cancelar
        </IonButton>
        <IonButton expand="full" disabled={!value} onClick={() => setOpenModal(false)}>
          Participar
        </IonButton>
      </div>
    </IonModal>
  );
};

export default Modal;
