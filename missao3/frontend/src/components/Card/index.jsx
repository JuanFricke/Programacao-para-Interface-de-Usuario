import styles from "./index.module.css";

export default function Card({
  nome,
  descricao = '',
  fotoProfessor = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png', // Imagem do professor
  urlImg = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png', // Imagem da matéria (foto de capa)  corIcon = '#000' // Cor do ícone
  corIcon = "#1976d2"
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader} style={{ backgroundColor: corIcon }} >
        <h2 className={styles.cardTitle}>{nome}</h2> {/* Nome da matéria */}
        <p className={styles.cardDescription}>{descricao}</p> {/* Nome do professor */}
        <img className={styles.cardImage} src={fotoProfessor} alt="Foto do professor" /> {/* Foto do professor */}
      </div>
      <div className={styles.cardBody}>
        {/* Imagem da matéria (foto de capa) */}
      </div>
      <div className={styles.cardFooter}>
        <img
          className={styles.trendingIcon}
          src="./imgs/trending_icon.svg"
          alt="trending icon"
        />
        <img
          className={styles.folderIcon}
          src="./imgs/folder_icon.svg"
          alt="folder icon"
        />
      </div>
    </div>
  );
}
