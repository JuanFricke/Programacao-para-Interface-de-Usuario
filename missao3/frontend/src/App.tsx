import { useState, useEffect } from "react";
import { IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "@ionic/react/css/core.css";
import "./styles/global.css";

/* Import your components */
import Menu from "../components/Menu";
import MenuLateral from "../components/MenuLateral";
import Modal from "../components/Modal";
import Card from "../components/Card";
import ButtonAdd from "../components/ButtonAdd"; // Importing ButtonAdd

const backendAddress = "http://localhost:5000/";

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
          <IonToolbar>
            <IonTitle>My Ionic App</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {/* Menu */}
          <Menu menuOpen={setOpen} open={open} setOpenModal={setOpenModal} />

          <IonGrid>
            <IonRow>
              {/* Side Menu */}
              <IonCol size="3">
                <MenuLateral open={open} turmas={disciplinas} />
              </IonCol>

              {/* Main Content */}
              <IonCol size="9">
                {disciplinas.length > 0 ? (
                  <IonGrid className="containerCards">
                    <IonRow>
                      {disciplinas.map(
                        ({ id, titulo, professor, fotoCapa, fotoProfessor, corIcon }) => (
                          <IonCol size="12" size-md="4" key={id}>
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
                      <IonButton expand="full" onClick={() => setOpenModal(true)}>
                        <IonIcon icon={addOutline} />
                        Add Class
                      </IonButton>
                    </IonRow>
                  </IonGrid>
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
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Modal */}
          {openModal && <Modal setOpenModal={setOpenModal} isOpen={false}/>}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
