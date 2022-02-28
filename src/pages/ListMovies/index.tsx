import { useEffect, useState } from "react";

import { Content } from "../../components/Content";
import { SideBar } from "../../components/SideBar";
import { GenreResponseProps, MovieProps } from "../../@types/movies";

import { api } from "../../services/api";

import "../../styles/global.scss";
import "../../styles/sidebar.scss";

export function ListMovies() {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        setSelectedGenre={setSelectedGenreId}
      ></SideBar>

      <Content movies={movies} selectedGenre={selectedGenre}></Content>
    </div>
  );
}
