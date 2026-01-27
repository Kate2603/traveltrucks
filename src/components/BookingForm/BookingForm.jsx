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

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success(
      `Бронирование успешно! ${camperName ? `(${camperName})` : ""}`,
    );
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.h3}>Book your camper</h3>

      <label className={styles.field}>
        <span>Name</span>
        <input
          className={styles.input}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Min 2 chars" },
          })}
          placeholder="Your name"
        />
        {errors.name ? (
          <span className={styles.err}>{errors.name.message}</span>
        ) : null}
      </label>

      <label className={styles.field}>
        <span>Email</span>
        <input
          className={styles.input}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          placeholder="name@email.com"
        />
        {errors.email ? (
          <span className={styles.err}>{errors.email.message}</span>
        ) : null}
      </label>

      <label className={styles.field}>
        <span>Booking date</span>
        <input
          type="date"
          className={styles.input}
          {...register("date", { required: "Date is required" })}
        />
        {errors.date ? (
          <span className={styles.err}>{errors.date.message}</span>
        ) : null}
      </label>

      <label className={styles.field}>
        <span>Comment</span>
        <textarea
          className={styles.textarea}
          {...register("comment")}
          placeholder="Optional notes..."
          rows={4}
        />
      </label>

      <button className={styles.btn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
