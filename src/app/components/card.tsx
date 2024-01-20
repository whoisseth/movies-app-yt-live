/** @format */

import Image from "next/image";
import React from "react";
import { PiTelevisionFill } from "react-icons/pi";
import dateFormat from "dateformat";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { MovieType } from "../type";
import { useAtom } from "jotai";
import { favoriteMoviesAtom } from "../atom";
import { IoBookmark } from "react-icons/io5";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  movieImg: string;
  year: string;
  rating: number;
  name: string;
  id: number;
  d: MovieType;
  addToFavorites: (d: MovieType) => void;
  removeFromFavorites: (d: MovieType) => void;
};

export default function Card(props: Props) {
  const [animationParent] = useAutoAnimate();
  const [favoritesMovies, setFavoritesMovies] = useAtom(favoriteMoviesAtom);

  const isFavorite = favoritesMovies.some((fav) => fav?.id === props.d.id);

  function handleFavoritMovies() {
    if (isFavorite) {
      props.removeFromFavorites(props.d);
    } else {
      props.addToFavorites(props.d);
    }
  }

  return (
    <div className="relative">
      <button
        ref={animationParent}
        onClick={handleFavoritMovies}
        className="h-10 w-10 bg-black/60 absolute right-2 top-2 rounded-full flex items-center justify-center z-10 hover:opacity-85 "
      >
        {isFavorite ? <IoBookmark /> : <CiBookmark className="text-xl" />}
      </button>
      <Link href={`/${props.id} `} className=" flex flex-col gap-1  ">
        {/* Image */}

        <div className="  h-[154px] w-[275px]  rounded-md overflow-hidden ">
          <Image
            height={400}
            width={400}
            className=" hover:scale-95  transition-all w-full h-full object-cover "
            src={props.movieImg}
            alt="movie-img"
          />
        </div>
        {/* details */}
        <div className="text-sm flex gap-3  text-gray-500 items-center">
          <div>{dateFormat(props.year, "yyyy")}</div>
          <div className=" flex gap-2  items-center">
            <PiTelevisionFill />
            <span>Tv Series</span>
            {/* ratings */}
            <p> {props.rating} </p>
          </div>
        </div>
        {/* movie title */}
        <p>{props.name}</p>
      </Link>
    </div>
  );
}

//   //  {props.year}
