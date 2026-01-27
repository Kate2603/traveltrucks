import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.picture} aria-hidden="true" />

        <div className={styles.titleBlock}>
          <div className={styles.textBlock}>
            <h1 className={styles.h1}>Campers of your dreams</h1>
            <h2 className={styles.h2}>
              You can find everything you want in our catalog
            </h2>
          </div>

          <Link to="/catalog" className={styles.cta}>
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
}
