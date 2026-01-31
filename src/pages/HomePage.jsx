import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>TravelTrucks — Home</title>
      </Helmet>

      <section className={styles.hero}>
        <picture className={styles.media} aria-hidden="true">
          <source
            media="(min-width: 1200px)"
            srcSet="/images/hero/hero-desktop@1x.jpg 1x, /images/hero/hero-desktop@2x.jpg 2x"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/hero/hero-tablet@1x.jpg 1x, /images/hero/hero-tablet@2x.jpg 2x"
          />
          <source
            media="(max-width: 767px)"
            srcSet="/images/hero/hero-mobile@1x.jpg 1x, /images/hero/hero-mobile@2x.jpg 2x"
          />
          <img
            className={styles.img}
            src="/images/hero/hero-desktop@1x.jpg"
            alt=""
            loading="eager"
            decoding="async"
          />
        </picture>

        <div className={styles.overlay} />

        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h1 className={styles.h1}>Campers of your dreams</h1>
            <p className={styles.h2}>
              You can find everything you want in our catalog
            </p>
          </div>

          <Link to="/catalog" className={styles.cta}>
            View Now
          </Link>
        </div>
      </section>
    </>
  );
}
