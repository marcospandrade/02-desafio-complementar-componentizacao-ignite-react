import React, { useState, useEffect } from "react";
import { GenreResponseProps, MovieProps } from "../@types/movies";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenre: (id: number) => void;
}

export function SideBar({ selectedGenreId, setSelectedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>(
    [] as GenreResponseProps[]
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenre(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
