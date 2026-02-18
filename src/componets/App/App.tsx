import "./App.module.css";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [searchData, setSearchData] = useState<string>("");
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const reqId = useRef(0);

  useEffect(() => {
    const q = searchData.trim();
    if (!q) return;

    const id = ++reqId.current;
    let active = true;

    const run = async () => {
      // переносимо setState всередину callback'а
      setLoading(true);
      setMovies(null);
      setSelectedMovie(null);

      try {
        const data = await fetchMovies(q);
        if (!active || reqId.current !== id) return;

        setMovies(data);

        if (data.length === 0) {
          toast.error("No movies found for your request.", { position: "top-right" });
        }
      } finally {
        if (active && reqId.current === id) setLoading(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [searchData]);

  return (
    <>
      <Toaster />
      <SearchBar setSearchData={setSearchData} />

      {loading && <p>Loading...</p>}

      {movies && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
