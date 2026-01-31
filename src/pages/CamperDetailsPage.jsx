import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCamperById } from "../redux/campers/campersSlice";
import Loader from "../components/Loader/Loader";
import FeaturesList from "../components/FeaturesList/FeaturesList";
import ReviewsList from "../components/ReviewsList/ReviewsList";
import BookingForm from "../components/BookingForm/BookingForm";
import { Icon } from "../ui/icons/icons.jsx";

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

  const [tabById, setTabById] = useState({});
  const tab = id ? tabById[id] || "features" : "features";

  const setTab = (next) => {
    if (!id) return;
    setTabById((prev) => (prev[id] === next ? prev : { ...prev, [id]: next }));
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const reviews = useMemo(() => {
    return Array.isArray(current?.reviews) ? current.reviews : [];
  }, [current]);

  const ratingText = useMemo(() => {
    const ratingNum = Number(current?.rating ?? 0);
    return Number.isFinite(ratingNum) ? ratingNum.toFixed(1) : "0.0";
  }, [current]);

  const gallery = useMemo(() => {
    const raw = Array.isArray(current?.gallery) ? current.gallery : [];
    return raw.map(getGalleryUrl).filter(Boolean).slice(0, 4);
  }, [current]);

  const isFeatures = tab === "features";

  if (currentLoading) return <Loader label="Loading camper details..." />;

  if (currentError) {
    return <div className={styles.error}>Error: {currentError}</div>;
  }

  if (!current) return null;

  return (
    <>
      <Helmet>
        <title>TravelTrucks — {current.name || "Camper"}</title>
      </Helmet>

      <div className={styles.page}>
        <div className="container">
          <div className={styles.back}>
            <Link className={styles.backLink} to="/catalog">
              ← Back to catalog
            </Link>
          </div>
          <header className={styles.head}>
            <div className={styles.headMain}>
              <h2 className={styles.title}>{current.name || "Camper"}</h2>

              <div className={styles.metaRow}>
                <div className={styles.rating}>
                  <span className={styles.star} aria-hidden="true">
                    <Icon name="icon-star" size={16} />
                  </span>

                  <span className={styles.ratingText}>
                    {ratingText} ({reviews.length} Reviews)
                  </span>
                </div>

                <div className={styles.location}>
                  <span className={styles.map} aria-hidden="true">
                    <Icon name="icon-map" size={16} />
                  </span>

                  <span className={styles.locationText}>
                    {current.location || "Unknown location"}
                  </span>
                </div>
              </div>

              <div className={styles.price}>€{formatPrice(current.price)}</div>
            </div>
          </header>
          <section className={styles.gallery} aria-label="Camper gallery">
            {gallery.length ? (
              gallery.map((src, idx) => (
                <img
                  key={`${src}-${idx}`}
                  className={styles.img}
                  src={src}
                  alt={`${current.name || "Camper"} ${idx + 1}`}
                  loading="lazy"
                />
              ))
            ) : (
              <div className={styles.noImg}>No gallery images</div>
            )}
          </section>
          <p className={styles.description}>
            {current.description
              ? String(current.description)
              : "No description."}
          </p>
          <div className={styles.tabs}>
            <div className={styles.tabTitles}>
              <button
                type="button"
                className={`${styles.tabBtn} ${isFeatures ? styles.tabActive : ""}`}
                onClick={() => setTab("features")}
              >
                Features
              </button>

              <button
                type="button"
                className={`${styles.tabBtn} ${!isFeatures ? styles.tabActive : ""}`}
                onClick={() => setTab("reviews")}
              >
                Reviews
              </button>
            </div>

            <div className={styles.tabLine}>
              <span
                className={`${styles.tabIndicator} ${
                  isFeatures ? styles.indicatorLeft : styles.indicatorRight
                }`}
              />
            </div>
          </div>
          <div className={styles.contentGrid}>
            <div
              className={
                isFeatures ? styles.leftPanel : styles.leftPanelReviews
              }
            >
              <div
                className={
                  isFeatures ? styles.leftCard : styles.leftCardReviews
                }
              >
                {isFeatures ? (
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
      </div>
    </>
  );
}
