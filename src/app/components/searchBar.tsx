/** @format */
import { IoIosSearch } from "react-icons/io";

import React from "react";

type Props = {
  value: string;
  onChnage: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function SearchBar({ value, onChnage }: Props) {
  return (
    <div className="border-2  rounded-lg w-fit flex gap-2 px-2 py-1 ">
      <IoIosSearch className="text-3xl" />

      {/* icon */}
      <input
        placeholder="Search Movies..."
        value={value}
        onChange={onChnage}
        className="outline-none  w-full  sm:w-[350px] bg-inherit  max-w-[350px]"
        type="text"
      />
    </div>
  );
}
