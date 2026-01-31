import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>TravelTrucks — Not Found</title>
      </Helmet>

      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.code}>404</div>
          <h2 className={styles.title}>Page not found</h2>
          <p className={styles.text}>
            The page you’re looking for doesn’t exist or was moved.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primary} to="/catalog">
              Go to Catalog
            </Link>
            <Link className={styles.secondary} to="/">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
