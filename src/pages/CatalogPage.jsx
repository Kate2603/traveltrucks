import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CatalogFilters from "../components/CatalogFilters/CatalogFilters";
import CamperList from "../components/CamperList/CamperList";
import Loader from "../components/Loader/Loader";

import {
  fetchCampers,
  applyFilters,
  loadMore,
  selectVisibleCampers,
  selectHasMore,
  selectCampersLoading,
  selectCampersError,
} from "../redux/campers/campersSlice";

import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();

  const filters = useSelector((s) => s.filters);
  const items = useSelector(selectVisibleCampers);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleApply = () => {
    dispatch(applyFilters(filters));
  };

  const isInitialLoading = isLoading && items.length === 0;

  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        {/* Filters */}
        <CatalogFilters onApply={handleApply} />

        {/* Content */}
        <div className={styles.content}>
          {error ? (
            <div className={styles.error}>Error: {String(error)}</div>
          ) : null}

          {isInitialLoading ? (
            <Loader label="Loading campers..." />
          ) : (
            <>
              <CamperList items={items} />

              {hasMore ? (
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.loadMore}
                    onClick={() => dispatch(loadMore())}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Load more"}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
