import React, { useState, useEffect } from "react";

export const Wheel = ({ winCategorys, code }) => {
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

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const spin = 6120;
  const winnings = winCategorys[0].fields.wins;
  // console.log("current", currentDegree);
  // console.log("rnd", rndSpin);
  // console.log("segmentSize", segmentSize);
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
      result.push({ name: "Verloren" });
      result.push(arr[i]);
    }
    return result;
  }

  const wheelArray = addLoseItems(winnings.map((winning) => winning.fields));

  //console.log(wheelArray);

  useEffect(() => {
    if (currentDegree >= 0 && currentDegree <= 45) {
      setWin("Verloren");
    } else if (currentDegree >= 46 && currentDegree <= 90) {
      setWin(winnings[2].fields.name);
    } else if (currentDegree >= 91 && currentDegree <= 135) {
      setWin("Verloren");
    } else if (currentDegree >= 136 && currentDegree <= 180) {
      setWin(winnings[1].fields.name);
    } else if (currentDegree >= 181 && currentDegree <= 225) {
      setWin("Verloren");
    } else if (currentDegree >= 226 && currentDegree <= 270) {
      setWin(winnings[0].fields.name);
    } else if (currentDegree >= 271 && currentDegree <= 315) {
      setWin("Verloren");
    } else if (currentDegree >= 316 && currentDegree <= 360) {
      setWin(winnings[3].fields.name);
      console.log("WINNER");
    }
  }, [currentDegree, win, winnings]);

  const circleStyle = {
    transform: spinning ? `rotate(${spin + rndSpin}deg)` : "",
    transition: "transform 10s",
  };

  return (
    <div className="">
      <div className="relative">
        <button
          className="text-center absolute top-0"
          id=""
          onClick={() => handleSpin()}
          disabled={showWin}
        >
          Spin
        </button>
        <div
          className={`text-right absolute top-0 -right-20 ${
            showWin ? "" : "hidden"
          }`}
        >
          {win}
        </div>
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
                backgroundColor: `#${winning.backgroundHex}`,
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
      </div>
    </div>
  );
};
