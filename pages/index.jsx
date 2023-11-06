import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HorizontalGallery from "../components/HorizontalGallery";
import background from "../public/img/background.png";
import ESNLogo from "../public/img/ESNLogo.png";
import icon from "../public/img/icon.png";
import { client } from "../lib/contentful";
import { Wheel } from "../components/Wheel";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

import { useInView } from "react-intersection-observer";

export default function Home({ winCategorys, code }) {
  console.log(winCategorys);
  const [codeInput, setCodeInput] = useState("");
  const [showWheel, setShowWheel] = useState(false);
  const [win, setWin] = useState(null);
  const [showWin, setShowWin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    setCodeInput(event.target.value.toUpperCase());
  };

  const winArray = winCategorys.map((winCategory) => winCategory.fields.name);

  const [headerRef, headerInView] = useInView();
  const [wheelRef, wheelInView] = useInView();

  const control = useAnimation();

  useEffect(() => {
    if (headerInView) {
      control.start("visible");
    }

    if (wheelInView) {
      control.start("visible");
    }
  }, [control, headerInView, wheelInView]);

  const headerVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
    hidden: { opacity: 0, scale: 1.3 },
  };

  console.log(winArray);
  let winCategoryIndex = null;
  for (let i = 0; i < code.length; i++) {
    if (code[i].fields.code === codeInput) {
      winCategoryIndex = winArray.indexOf(
        code[i].fields.winCategory.fields.name
      );

      break;
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(winCategoryIndex);
      setErrorMessage(
        winCategoryIndex === null ? "Überprüfe ob der Code korrekt ist!" : ""
      );
      setShowWheel(winCategoryIndex === null ? false : true);
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleWinUpdate = (newWin) => {
    setWin(newWin);
    if (newWin === "Verloren") {
      sleep(10300).then(() => {
        setShowWin(true);
      });
    } else {
      sleep(10300).then(() => {
        setShowWin(true);
      });
    }
  };

  console.log(code);
  console.log(win);
  return (
    <div className="overflow-hidden font-bold">
      <div className="relative h-screen w-screen">
        {!showWin ? (
          ""
        ) : (
          <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2/4 w-1/3 bg-white rounded-3xl">
              <div className="w-full h-full rounded-2xl relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                  {win.name ? (
                    <ConfettiExplosion
                      className="z-50"
                      force={0.8}
                      duration={6000}
                      particleCount={400}
                      width={3000}
                      height={2000}
                    />
                  ) : null}
                </div>
                <div className="text-black items-center text-center justify-center flex h-56 m-2 rounded-2xl">
                  {win.image ? (
                    win.image ? (
                      <Image
                        src={`https:${win.image.fields.file.url}`}
                        width={150}
                        height={150}
                        alt=""
                      />
                    ) : (
                      <div>Image</div>
                    )
                  ) : (
                    <Image
                      src={`https:media.istockphoto.com/id/932022348/vector/sad-face-icon-unhappy-face-symbol.jpg?s=612x612&w=0&k=20&c=ZpGiAAFxUNnde83WA2mqotDiZF2lFukmu5vs8fHc8rA=`}
                      width={150}
                      height={150}
                      alt=""
                    />
                  )}
                </div>
                <div className="w-full flex justify-center mt-6 text-3xl">
                  {win.name ? win.name : "Verloren"}
                </div>
                <div className="w-full flex justify-center mt-12 text-3xl">
                  {win.name ? "Code: USP0J4" : ""}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            variants={headerVariant}
            animate={control}
            ref={headerRef}
            initial="hidden"
          >
            <Image src={ESNLogo} width={550} height={330} alt="" />
            <div className="text-8xl font-bold text-white">Gewinnspiel</div>
            <div className="mt-12 flex justify-center animate-bounce ">
              <Image src={icon} width={70} height={50} alt="" />
            </div>
          </motion.div>
        </div>
        <Image src={background} fill alt="" />
      </div>
      <HorizontalGallery winCategorys={winCategorys} />
      <div className="w-screen h-screen bg-stone-900 flex pt-96 justify-center text-white font-bold text-7xl relative">
        {showWheel ? (
          <div
            style={{ bottom: "-53%" }}
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <motion.div>
              <Wheel
                winUpdate={handleWinUpdate}
                winCategoryIndex={winCategoryIndex}
                code={code}
                winCategorys={winCategorys}
              />
            </motion.div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-10">Gebe hier den Code ein!</div>
            <input
              className={`w-1/2 h-1/6 rounded-lg text-black text-center ${
                errorMessage === "" ? "" : "bg-red-600 text-white"
              }`}
              value={codeInput}
              onChange={handleInput}
              onKeyDown={handleKeyPress}
            />
            <div className="text-2xl text-red-600 mt-8">{errorMessage}</div>
          </div>
        )}

        {/* <p className="">Glücksrad</p>
        <div style={{ bottom: "-53%" }} className="absolute ">
          <Wheel winCategoryIndex={winCategoryIndex} code={code} winCategorys={winCategorys} />
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
