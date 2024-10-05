import React from "react";
import Link from "next/link";

function Button(props) {
  return (
    <Link
      className="border-black border-4 bg-sky-400 rounded-b-3xl hover:border-white hover:border-6 rounded-tr-3xl font-bold p-4 w-56 text-center transition ease-in-out hover:text-black  hover:bg-sky-500 text-xl"
      href={props.src}
    >
      {props.text}
    </Link>
  );
}

export default Button;
