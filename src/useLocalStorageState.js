import { useState,useEffect } from "react";




export function useLocalStorageState(initialState,key) {

    const [watched, setWatched] = useState(function () {
        const watchedMovies = JSON.parse(localStorage.getItem(key));
        return watchedMovies ? watchedMovies : initialState;
      });
    
      useEffect(
        function () {
          localStorage.setItem(key, JSON.stringify(watched));
        },
        [watched,key]
      );

        return [watched,setWatched];
    

}