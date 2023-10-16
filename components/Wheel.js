import React, { useState } from "react";

export const Wheel = ({ values }) => {
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

  const [spinning, setSpinning] = useState(false);
  const segmentSize = 360 / values.length;

  const circleStyle = {
    transform: spinning ? "rotate(6000deg)" : "",
    transition: "transform 10s", // smooth transition
  };

  const calculate1 = (x) => {
    const y = x * -2.82 + 125;
    return y;
  };

  function calculate2(X) {
    // Calculate Y using the equation f(x) = -x + 100
    const Y = -X + 100;
    return Y;
  }

  console.log(calculate1(values.length));
  console.log(calculate2(calculate1(values.length)));
  return (
    <div className="">
      <button id="" onClick={() => setSpinning(true)}>
        Spin
      </button>
      <button id="" onClick={() => setSpinning(false)}>
        Reset
      </button>
      <span class="arrow"></span>
      <div style={circleStyle} className="circle">
        {values.map((value, i) => (
          <div
            className="segment text-black"
            style={{
              clipPath: `polygon(${calculate1(
                values.length
              )}% 0, 50% 100%, ${calculate2(calculate1(values.length))}% 0)`,
              transform: `rotate(${segmentSize * (i + 1)}deg)`,
            }}
            key={i}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
