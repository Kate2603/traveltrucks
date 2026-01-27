import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCamperById } from "../redux/campers/campersSlice";
import Loader from "../components/Loader/Loader";
import FeaturesList from "../components/FeaturesList/FeaturesList";
import ReviewsList from "../components/ReviewsList/ReviewsList";
import BookingForm from "../components/BookingForm/BookingForm";
import StarRating from "../components/StarRating/StarRating";
import styles from "./CamperDetailsPage.module.css";

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "0,00";
  return num.toFixed(2).replace(".", ",");
}

function getGalleryUrl(item) {
  if (!item) return "";
  if (typeof item === "string") return item;
  if (typeof item === "object") return item.thumb || item.original || "";
  return "";
}

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { current, currentLoading, currentError } = useSelector(
    (s) => s.campers,
  );

  // таб зберігаємо окремо для кожного id
  const [tabById, setTabById] = useState({});

  const tab = tabById[id] || "features";

  const setTab = (next) => {
    setTabById((prev) => (prev[id] === next ? prev : { ...prev, [id]: next }));
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (currentLoading) return <Loader label="Loading camper details..." />;

  if (currentError) {
    return <div className={styles.error}>Error: {currentError}</div>;
  }

  if (!current) return null;

  const reviews = Array.isArray(current.reviews) ? current.reviews : [];

  const rawGallery = Array.isArray(current.gallery) ? current.gallery : [];
  const gallery = rawGallery.map(getGalleryUrl).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>TravelTrucks — {current.name || "Camper"}</title>
      </Helmet>

      <div className={styles.page}>
        <div className={styles.back}>
          <Link className={styles.backLink} to="/catalog">
            ← Back to catalog
          </Link>
        </div>

        <section className={styles.head}>
          <div className={styles.headLeft}>
            <h2 className={styles.title}>{current.name || "Camper"}</h2>

            <div className={styles.sub}>
              <div className={styles.ratingWrap}>
                <StarRating value={current.rating || 0} />
                <span className={styles.reviewsCount}>
                  ({reviews.length} reviews)
                </span>
              </div>

              <span className={styles.dot}>•</span>

              <div className={styles.loc}>
                {current.location || "Unknown location"}
              </div>
            </div>
          </div>

          <div className={styles.price}>€{formatPrice(current.price)}</div>
        </section>

        <div className={styles.gallery}>
          {gallery.length ? (
            gallery
              .slice(0, 4)
              .map((src, idx) => (
                <img
                  key={idx}
                  className={styles.img}
                  src={src}
                  alt={`${current.name || "Camper"} ${idx + 1}`}
                  loading="lazy"
                />
              ))
          ) : (
            <div className={styles.noImg}>No gallery images</div>
          )}
        </div>

        <p className={styles.description}>
          {current.description
            ? String(current.description)
            : "No description."}
        </p>

        <div className={styles.tabs}>
          <div className={styles.tabTitles}>
            <button
              type="button"
              className={`${styles.tabBtn} ${
                tab === "features" ? styles.tabActive : ""
              }`}
              onClick={() => setTab("features")}
            >
              Features
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${
                tab === "reviews" ? styles.tabActive : ""
              }`}
              onClick={() => setTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className={styles.tabLine}>
            <span
              className={`${styles.tabIndicator} ${
                tab === "features"
                  ? styles.indicatorLeft
                  : styles.indicatorRight
              }`}
            />
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.leftPanel}>
            <div className={styles.leftCard}>
              {tab === "features" ? (
                <FeaturesList camper={current} />
              ) : (
                <ReviewsList reviews={reviews} />
              )}
            </div>
          </div>

          <div className={styles.rightPanel}>
            <BookingForm camperName={current.name} />
          </div>
        </div>
      </div>
    </>
  );
}
