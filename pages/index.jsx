import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HorizontalGallery from "../components/HorizontalGallery";
import background from "../public/img/background.png";
import ESNLogo from "../public/img/ESNLogo.png";
import icon from "../public/img/icon.png";
import { client } from "../lib/contentful";
import { Wheel } from "../components/Wheel";
import React, { useState } from "react";

export default function Home({ winCategorys, code }) {
  console.log(winCategorys);
  const [codeInput, setCodeInput] = useState("");
  const handleInput = (event) => {
    event.preventDefault();
    setCodeInput(event.target.value.toUpperCase());
  };

  return (
    <div className="overflow-hidden">
      <div className="relative h-screen w-screen">
        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <Image src={ESNLogo} width={550} height={330} alt="" />
          <div className="text-8xl font-bold text-white">Gewinnspiel</div>
          <div className="mt-5 flex justify-center">
            <Image src={icon} width={70} height={50} alt="" />
          </div>
        </div>
        <Image src={background} fill alt="" />
      </div>
      <HorizontalGallery winCategorys={winCategorys} />
      <div className="w-screen h-screen bg-stone-900 flex pt-64 justify-center text-white font-bold text-7xl relative">
        <div className="text-center">
          <div className="mb-10">Gebe hier den Code ein!</div>
          <input
            className="w-1/2 h-1/6 rounded-lg text-black text-center"
            value={codeInput}
            onChange={handleInput}
          />
        </div>

        {/* <p className="">Glücksrad</p>
        <div style={{ bottom: "-53%" }} className="absolute ">
          <Wheel code={code} winCategorys={winCategorys} />
        </div> */}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const winCategory = await client.getEntries({ content_type: "winCategory" });
  const code = await client.getEntries({ content_type: "code" });
  return {
    props: {
      code: code.items,
      winCategorys: winCategory.items,
      revalidate: 70,
    },
  };
};
