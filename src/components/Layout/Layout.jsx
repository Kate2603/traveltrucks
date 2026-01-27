import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.app}>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <span>© {new Date().getFullYear()} TravelTrucks</span>
            <span className={styles.muted}>Frontend test task</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
