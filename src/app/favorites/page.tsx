/** @format */
'use client'
import React from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import { useAtom } from "jotai";
import { favoriteMoviesAtom } from "../atom";
import { MovieType } from "../type";

type Props = {};

export default function FavoritesPage({}: Props) {
  const [favoritesMovies, setFavoritesMovies] = useAtom(favoriteMoviesAtom);

  function addToFavorites(d: MovieType) {
    setFavoritesMovies((pre) => [...pre, d]);
  }
  function removeFromFavorites(d: MovieType) {
    setFavoritesMovies((pre) => pre.filter((fav) => fav.id !== d.id));
  }

  return (
    <main className=" max-w-7xl mx-auto px-2 sm:px-4 md:px-6 flex flex-col gap-4">
      <Navbar />

      <section className=" justify-center flex flex-wrap gap-3 sm:justify-between">
        {/* card */}

        {favoritesMovies?.map((d, i) => (
          <Card
            addToFavorites={() => addToFavorites(d)}
            removeFromFavorites={() => removeFromFavorites(d)}
            d={d}
            id={d.id}
            key={i}
            movieImg={d.image.original}
            name={d.name}
            rating={d.rating.average}
            year={d.premiered}
          />
        ))}
      </section>
    </main>
  );
}
