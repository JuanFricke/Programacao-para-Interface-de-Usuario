import { useState } from "react";
import styles from "./index.module.css";

export default function MenuLateral({ open, turmas }) {
  const [hover, setHover] = useState(false);
  const menuOpen = open ? open : hover;
  const [subMenuOpen, setSubMenu] = useState(menuOpen);

  return (
    <div
      className={styles.menuLateral}
      onMouseEnter={() => {
        setHover(true);
        setSubMenu(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setSubMenu(false);
      }}
    >
      <a href="" className={styles.containerIcon}>
        <img
          src="./imgs/home.svg"
          alt="home"
          className={styles.iconMenu + " " + styles.iconActive}
        />
        {menuOpen && (
          <p className={styles.descriptionTurma + " " + styles.pActive}>
            Início
          </p>
        )}
      </a>
      <a href="" className={styles.containerIcon}>
        <img
          src="./imgs/calendar.svg"
          alt="calendar"
          className={styles.iconMenu}
        />
        {menuOpen && <p className={styles.descriptionTurma}>Agenda</p>}
      </a>
      <a href="" className={styles.containerIcon}>
        <img
          src="./imgs/auto_stories.svg"
          alt="auto_stories"
          className={styles.iconMenu}
        />
        {menuOpen && <p className={styles.descriptionTurma}>Turmas</p>}
      </a>
      <div className={styles.divider}></div>
      <a href="" className={styles.containerIcon}>
        <img src="./imgs/group.svg" alt="group" className={styles.iconMenu} />
        {menuOpen && <p className={styles.descriptionTurma}>Estudantes</p>}
      </a>
      <div className={styles.divider}></div>
      <a
        className={styles.containerIcon}
        onClick={() => setSubMenu(!subMenuOpen)}
      >
        {subMenuOpen ? (
          <img
            src="./imgs/arrow_down.svg"
            alt="arrow_down"
            className={styles.iconSeta}
          />
        ) : (
          <img
            src="./imgs/arrow_right.svg"
            alt="arrow_right"
            className={styles.iconSeta}
          />
        )}
        <img src="./imgs/school.svg" alt="school" className={styles.iconMenu} />
        {menuOpen && (
          <p className={styles.descriptionTurma}>Minhas inscrições</p>
        )}
      </a>
      {subMenuOpen && (
        <>
          <a href="" className={styles.containerIcon}>
            <img
              src="./imgs/fact_check.svg"
              alt="fact_check"
              className={styles.iconMenu}
            />
            {menuOpen && <p className={styles.descriptionTurma}>Pendentes</p>}
          </a>
          {turmas.length > 0 &&
            turmas.map(({ titulo, corIcon }, index) => (
              <a href="" className={styles.containerIcon} key={index}>
                <span
                  className={styles.iconTurma}
                  style={{ backgroundColor: corIcon }}
                ></span>
                {menuOpen && <p className={styles.descriptionTurma}>{titulo}</p>}
              </a>
            ))}
        </>
      )}
      <div className={styles.divider}></div>
      <a href="" className={styles.containerIcon}>
        <img
          src="./imgs/settings.svg"
          alt="school"
          className={styles.iconMenu}
        />
        {menuOpen && <p className={styles.descriptionTurma}>Configurações</p>}
      </a>
    </div>
  );
}
