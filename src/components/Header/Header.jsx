import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink
          to="/"
          end
          className={styles.brand}
          aria-label="TravelTrucks Home"
        >
          <span className={styles.title}>
            Travel<span className={styles.titleAccent}>Trucks</span>
          </span>
        </NavLink>

        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/catalog" className={getLinkClass}>
            Catalog
          </NavLink>
        </nav>

        <div className={styles.rightSpacer} aria-hidden="true" />
      </div>
    </header>
  );
}
