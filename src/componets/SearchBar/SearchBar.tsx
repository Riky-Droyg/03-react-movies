import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

type Props = {
  setSearchData: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ setSearchData }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = (formData.get("query") ?? "").toString().trim();

    if (!query) {
      toast.error("Please enter your search query.", { position: "top-right" });
      return;
    }

    setSearchData(query);
    // e.currentTarget.reset(); // опційно: очистити інпут після пошуку
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          Powered by TMDB
        </a>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
