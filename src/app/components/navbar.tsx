/** @format */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../utils/cn";

type Props = {};

export default function Navbar({}: Props) {
  const usePath = usePathname();

  console.log("usePath-", usePath);

  return (
    <div className="flex max-w-7xl mx-auto w-full  justify-between items-center  py-4 px-2">
      <Link href={"/"} className="font-bold text-4xl">
        Movies
      </Link>

      <div className="flex gap-3 text-xl font-semibold">
        <Link
          className={cn("border-b-2 border-transparent ", {
            " text-blue-400 border-blue-400": usePath === "/"
          })}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={cn("border-b-2 border-transparent ", {
            " text-blue-400 border-blue-400": usePath === "/favorites"
          })}
          href={"/favorites"}
        >
          Favorites
        </Link>
      </div>
    </div>
  );
}
