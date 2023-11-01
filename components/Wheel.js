import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const Wheel = ({ winCategorys, code, winCategoryIndex, winUpdate }) => {
  // const totalValues = values.length;

  // const segmentSize = 360 / totalValues; // Calculate the size of each segment in degrees

  // const segments = values.map((value, index) => {
  //   const rotation = index * segmentSize; // Calculate the rotation angle for each segment

  //   const segmentStyle = {
  //     transform: `rotate(${rotation}deg)`,
  //   };

  //   return (
  //     <div className="segment" style={segmentStyle} key={index}>
  //       {value}
  //     </div>
  //   );
  // });
  const segmentSize = 360 / 8;
  const [spinning, setSpinning] = useState(false);
  const [currentDegree, setCurrentDegree] = useState(360 - segmentSize / 2);
  const [showWin, setShowWin] = useState(false);
  const [win, setWin] = useState("");
  const [rndSpin, setRndSpin] = useState(0);

  const [wheelRef, wheelInView] = useInView();

  const control = useAnimation();

  useEffect(() => {
    if (wheelInView) {
      control.start("visible");
    }
  }, [control, wheelInView]);

  const wheelVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 1.5 },
    },
    hidden: { opacity: 0, scale: 1, rotate: -180, y: 200 },
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const spin = 6120;
  const winnings = winCategorys[winCategoryIndex].fields.wins;
  console.log("Categorys", winCategorys[0]);
  console.log("code", code);

  const handleSpin = () => {
    const randomNr = getRandomNumber(0, 360);
    setRndSpin(randomNr);
    setCurrentDegree((spin + randomNr + currentDegree) % 360);
    setSpinning(!spinning);

    sleep(10000).then(() => {
      setShowWin(true);
    });
  };

  function addLoseItems(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push({ name: "Verloren", backgroundHex: "000000" });
      result.push(arr[i]);
    }
    return result;
  }

  const wheelArray = addLoseItems(winnings.map((winning) => winning.fields));
  console.log(winnings[0].fields);
  useEffect(() => {
    if (currentDegree >= 0 && currentDegree <= 45) {
      setWin("Verloren");
      winUpdate("Verloren");
    } else if (currentDegree >= 46 && currentDegree <= 90) {
      //  setWin(winnings[2].fields.name);
      spinning ? winUpdate(winnings[2].fields) : null;
    } else if (currentDegree >= 91 && currentDegree <= 135) {
      setWin("Verloren");
      winUpdate("Verloren");
    } else if (currentDegree >= 136 && currentDegree <= 180) {
      //  setWin(winnings[1].fields.name);
      spinning ? winUpdate(winnings[1].fields) : null;
    } else if (currentDegree >= 181 && currentDegree <= 225) {
      setWin("Verloren");
      winUpdate("Verloren");
    } else if (currentDegree >= 226 && currentDegree <= 270) {
      // setWin(winnings[0].fields.name);
      spinning ? winUpdate(winnings[0].fields) : null;
    } else if (currentDegree >= 271 && currentDegree <= 315) {
      setWin("Verloren");
      winUpdate("Verloren");
    } else if (currentDegree >= 316 && currentDegree <= 360) {
      //  setWin(winnings[3].fields.name);
      spinning ? winUpdate(winnings[3].fields) : null;
    }
  }, [currentDegree, win, winnings, winUpdate, spinning]);

  const circleStyle = {
    transform: spinning ? `rotate(${spin + rndSpin}deg)` : "",
    transition: "transform 10s",
  };

  return (
    <div className="">
      <div className="relative">
        <motion.div
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ ease: "easeInOut", duration: 2, repeat: Infinity }}
        >
          <button
            className="text-center text-black border-black bg-white border-6 rounded-3xl pb-5 px-28 absolute -top-60 z-50 left-1/2 transform -translate-x-1/2 hover:bg-black hover:text-white transition duration-700 ease-in-out"
            onClick={() => handleSpin()}
            disabled={showWin}
          >
            Spin
          </button>
        </motion.div>
        <div
          className={`text-right absolute -top-32 right-32 ${
            showWin ? "" : "hidden"
          }`}
        ></div>

        <motion.div
          variants={wheelVariant}
          animate={control}
          ref={wheelRef}
          initial="hidden"
        >
          <svg
            className="absolute z-50 left-1/2 transform -translate-x-1/2 -top-24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width="200px"
            height="200px"
            viewBox="0 0 1024 1024"
          >
            <path d="M759.2 419.8L697.4 358 512 543.4 326.6 358l-61.8 61.8L512 667z" />
          </svg>
          <div style={circleStyle} className="circle relative">
            {wheelArray.map((winning, i) => (
              <div
                className="segment circle-child flex justify-center text-black break-words text-3xl pt-10"
                style={{
                  backgroundColor: `#${
                    winning.backgroundHex ? winning.backgroundHex : "FFFFFF"
                  }`,
                  clipPath: `polygon(${100}% 0, 50% 100%, ${0}% 0)`,
                  transform: `rotate(${segmentSize * (i + 1)}deg)`,
                }}
                key={i}
              >
                <div className="text-center px-5 break-normal ">
                  {winning.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
