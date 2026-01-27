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
          <h2 className={styles.code}>404</h2>
          <h3 className={styles.title}>Page not found</h3>
          <p className={styles.text}>
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className={styles.actions}>
            <Link to="/catalog" className={styles.primary}>
              Go to Catalog
            </Link>
            <Link to="/" className={styles.secondary}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
