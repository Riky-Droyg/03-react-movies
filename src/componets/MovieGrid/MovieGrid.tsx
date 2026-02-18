import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

type Props = {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
};

export default function MovieGrid({ onSelect, movies }: Props) {
  return (
    <ul className={css.grid}>
      {movies.map((el) => (
        <li key={el.id} onClick={() => onSelect(el)} className={css.item}>
          <div className={css.card}>
            {el.backdrop_path && (
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${el.backdrop_path}`}
                alt={el.title}
                loading="lazy"
              />
            )}
            <h2 className={css.title}>{el.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
