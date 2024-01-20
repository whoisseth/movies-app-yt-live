/** @format */

import { atom } from "jotai";
import { MovieType } from "./type";

export const favoriteMoviesAtom = atom<MovieType[]>([]);
