import { useState } from "react";
import styles from "./index.module.css";

export default function Modal({ setOpenModal }) {
  const [value, setValue] = useState('');

  return (
    <div className={styles.containerModal} onClick={() => setOpenModal(false)}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.modalHeader}>Participar da turma</div>
        <div className={styles.modalBody}>
          <div className={`${styles.containerInput} ${styles.border}`}>
            <label htmlFor="codTurma">Código da turma:</label>
            <span>Peça para seu professor o código da turma e digite-o aqui.</span>
            <input name="codTurma" type="text" placeholder="Código da turma:" value={value} onChange={(event) => setValue(event.target.value)} />
          </div>
          <div className={styles.containerInput}>
            Para fazer login com o código da turma
            <ul>
              <li>Use uma conta autorizada.</li>
              <li>Use um código da turma, com cinco a sete letras ou números, sem espaços ou símbolos.</li>
            </ul>
            <p>Se tiver problemas para participar da turma, consulte este <a target="_blank" href="https://support.google.com/edu/classroom/answer/6020297?hl=pt-BR&authuser=0#zippy=%2Cesqueci-ou-perdi-o-c%C3%B3digo-da-turma%2Cmeu-c%C3%B3digo-da-turma-n%C3%A3o-funciona">artigo da Central de Ajuda</a>.</p>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btn} onClick={() => setOpenModal(false)}>Cancelar</button>
          <button className={styles.btn} onClick={() => setOpenModal(false)} disabled={!value} >Participar</button>
        </div>
      </div>
    </div>
  );
}
