/** @format */
"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchBar";
import { PiTelevisionFill } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { MovieType } from "./type";
import Card from "./components/card";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favoriteMoviesAtom } from "./atom";

export default function Home() {
  const api = "https://api.tvmaze.com/shows";

  const [favoritesMovies, setFavoritesMovies] = useAtom(favoriteMoviesAtom);
  const [search, setSearch] = useState("");

  const {
    isLoading,
    error,
    refetch,
    data: moviesData
  } = useQuery<MovieType[]>({
    queryKey: ["singeMovie"],
    queryFn: () => fetch(api).then((res) => res.json())
  });

  // console.log("data-", moviesData);

  const data = search
    ? moviesData?.filter((d) =>
        d.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : moviesData;

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  console.log("data-", data);

  function addToFavorites(d: MovieType) {
    setFavoritesMovies((pre) => [...pre, d]);
  }
  function removeFromFavorites(d: MovieType) {
    setFavoritesMovies((pre) => pre.filter((fav) => fav.id !== d.id));
  }

  console.log("favoritesMovies-", favoritesMovies);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <main className=" max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <Navbar />
        <div className="max-w-7xl items-center sm:items-start px-2 mx-auto flex flex-col gap-8 ">
          <SearchBar
            onChnage={(e) => setSearch(e.target.value)}
            value={search}
          />
          <section className=" justify-center flex flex-wrap gap-3 sm:justify-between pb-10">
            {/* card */}

            {data && moviesData
              ? data?.map((d, i) => (
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
                ))
              : "loading..."}
          </section>
        </div>
      </main>
    </div>
  );
}
