import { IonApp, setupIonicReact, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonModal  } from '@ionic/react';
import { addOutline } from "ionicons/icons";
import { useState, useEffect } from "react";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './styles/global.css';


import MenuLateral from "./components/MenuLateral";
import Modal from "./components/Modal";
import Card from "./components/Card";
import ButtonAdd from "./components/ButtonAdd";
import Menu from "./components/Menu";
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();
const backendAddress = "http://192.168.112.230:5000/";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        console.log("Requesting Classes");
        const response = await fetch(backendAddress + "get_classes");

        if (!response.ok) {
          throw new Error("Request not working");
        }

        const data = await response.json();
        setProfessores(data);

        const disciplinasTransformadas = data.flatMap((professor: any) =>
          professor.materias.map((materia: any) => ({
            ...materia,
            professor: professor.nome,
            fotoProfessor: professor.foto, // Adicionar a foto do professor
          }))
        );
        setDisciplinas(disciplinasTransformadas);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    };

    fetchProfessores();
  }, []);


  return (
<IonApp>
      <IonPage>
        <IonHeader>
          {/* <IonToolbar>
            <IonTitle>Lori Classroom</IonTitle>
          </IonToolbar> */}
        </IonHeader>

        <IonContent>
          <Menu menuOpen={setOpen} open={open} setOpenModal={setOpenModal} />
          <IonGrid>
            <IonRow>
              <IonModal isOpen={open} className='modal-class'>
              <MenuLateral open={open} turmas={disciplinas} />
              </IonModal>
                {disciplinas.length > 0 ? (
                  <IonCol>
                    <IonButton expand="full" onClick={() => setOpenModal(true)}>
                        <IonIcon icon={addOutline} />
                        Add Class
                      </IonButton>
                      {disciplinas.map(
                        ({ id, titulo, professor, fotoCapa, fotoProfessor, corIcon }) => (
                          <IonCol size="10" size-md="4" key={id}>
                            <Card
                              nome={titulo}
                              descricao={professor}
                              urlImg={fotoCapa}
                              fotoProfessor={fotoProfessor}
                              corIcon={corIcon}
                            />
                          </IonCol>
                        )
                      )}
                  </IonCol>
                ) : (
                  <IonGrid className="mensagemSmTurma">
                    <IonRow>
                      <IonCol>
                        <img
                          className="gifNotFound"
                          src="https://media0.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif"
                          alt=""
                        />
                        <p className="mensagem">Nenhuma turma encontrada</p>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                )}
            </IonRow>
          </IonGrid>

          {openModal && <Modal setOpenModal={setOpenModal} isOpen={false}/>}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
