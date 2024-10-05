import React from "react";
import Image from "next/image";
import { Link } from "next/link";

function Navbar() {
  return (
    <div className="bg-indigo-600 gap-2 flex items-center align-center p-4">
      <Image src={"/resume.png"} width={50} height={50}></Image>
      <div className="flex flex-col">
        {" "}
        <h1 className="text-2xl text-white">
          {" "}
          Resu<span className="text-sky-400 font-bold">Me.</span>{" "}
        </h1>
        <h1 className="text-s text-white"> Diagnose your Resume! </h1>{" "}
      </div>

      <div className="flex gap-4 items-center bg-sky-400/50 p-4 rounded-2xl">
        {" "}
        Diagnose{" "}
      </div>
    </div>
  );
}

export default Navbar;
