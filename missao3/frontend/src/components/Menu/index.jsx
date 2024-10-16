import styles from "./index.module.css";

export default function Menu({ open, menuOpen, setOpenModal }) {
  return (
    <>
      <div className={styles.header}></div>
      <header className={styles.menuContainer}>
        <nav className={styles.menuNavbar}>
          <button
            className={styles.btn_hamburger}
            onClick={() => menuOpen(!open)}>
            <img
              className={styles.menuHamburgerIcon}
              src="./imgs/menu-hamburguer-icon.svg"
              alt="menu-hamburguer icon"
            />
          </button>
          <img
            className={styles.menuClassroomIcon}
            src="./imgs/classroom-logo.svg"
            alt="classroom icon"
          />
          <t1 className={styles.menuTitle}>Google Sala de Aula</t1>
        </nav>
        <div className={styles.menuUser}>
          <button
            className={styles.btn_hamburger}
            onClick={() => setOpenModal(true)}>
            <img
              className={styles.menuAddIcon}
              src="./imgs/add-icon.svg"
              alt="add icon"
            />
          </button>
          <img
            className={styles.menuAppsIcon}
            src="./imgs/apps-icon.svg"
            alt="add icon"
          />
          <img
            className={styles.menuUseraccountIcon}
            src="./imgs/user-account-icon.svg"
            alt="add icon"
          />
        </div>
      </header>
    </>
  );
}
