import { useState,useEffect } from "react";


const KEY = "ef505905";

export function useMovies(query,callback) {

    const [movies, setMovies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            const controller = new AbortController();
          async function fetchMovies() {
            try {
              setIsLoaded(true);
              setError("");
    
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
    
              if (!res.ok)
                throw new Error("Something went wrong with fetching movies");
    
              const data = await res.json();
              if (data.Response === "False") throw new Error("Movie not found");
    
              setMovies(data.Search);
              setError("");
            } catch (err) {
              if (err.name !== "AbortError") {
                setError(err.message);
              }
            } finally {
              setIsLoaded(false);
            }
          }
          if (!query.length) {
            setMovies([]);
            setError("");
            return;
          }
         callback?.();
          fetchMovies();
    
          return function () {
            controller.abort();
          };
        },
        [query]
      );
      return { movies, isLoaded, error };
    
}