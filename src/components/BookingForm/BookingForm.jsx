import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./BookingForm.module.css";

export default function BookingForm({ camperName }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", date: "", comment: "" },
    mode: "onBlur",
  });

  const [dateMode, setDateMode] = useState("text");

  const placeholders = useMemo(
    () => ({
      name: "Name*",
      email: "Email*",
      date: "Booking date*",
      comment: "Comment",
    }),
    [],
  );

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success(
      `Бронирование успешно! ${camperName ? `(${camperName})` : ""}`,
    );
    reset();
    setDateMode("text");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.titleBlock}>
        <h3 className={styles.h3}>Book your campervan now</h3>
        <p className={styles.sub}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={styles.inputs}>
        <div className={styles.fields}>
          <input
            className={styles.input}
            placeholder={placeholders.name}
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Min 2 chars" },
            })}
          />
          {errors.name ? (
            <div className={styles.err}>{errors.name.message}</div>
          ) : null}

          <input
            className={styles.input}
            placeholder={placeholders.email}
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email ? (
            <div className={styles.err}>{errors.email.message}</div>
          ) : null}

          <input
            className={styles.input}
            type={dateMode}
            placeholder={placeholders.date}
            onFocus={() => setDateMode("date")}
            onBlur={(e) => {
              if (!e.target.value) setDateMode("text");
            }}
            aria-invalid={errors.date ? "true" : "false"}
            {...register("date", { required: "Date is required" })}
          />
          {errors.date ? (
            <div className={styles.err}>{errors.date.message}</div>
          ) : null}

          <textarea
            className={styles.textarea}
            placeholder={placeholders.comment}
            rows={4}
            {...register("comment")}
          />
        </div>

        <button className={styles.btn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
