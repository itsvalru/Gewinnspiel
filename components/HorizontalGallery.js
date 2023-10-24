import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App(winCategorys) {
  const scroller = useRef();
  const skills = useRef();

  useEffect(() => {
    let skillSet = gsap.utils.toArray(".skill-set");

    let to = gsap.to(skillSet, {
      xPercent: () => -100 * (skillSet.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scroller.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: 1 / (skillSet.length - 1),

        end: () => "+=" + window.innerWidth,
      },
    });

    return () => {
      to.kill();
    };
  }, []);
  console.log(winCategorys);
  return (
    <div className="overflow-hidden flex">
      <div className="overflow-hidden ">
        <div
          id="skills"
          ref={scroller}
          className=" flex overflow-x-hidden w-[400vw] m-0 bg-gray-100  relative h-screen"
        >
          {winCategorys.winCategorys.map((winCategoty, i) => (
            <section
              key={i}
              ref={skills}
              className="skill-set px-20 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full">
                  <div className="text-7xl font-bold text-center mb-16">
                    {winCategoty.fields.name}
                  </div>
                  <div className="text-2xl font-bold flex justify-center grid grid-cols-2 gap-10">
                    {winCategoty.fields.wins.map((win, i) => (
                      <div
                        key={i}
                        className="mx-2 text-white bg-black w-full h-80 rounded-2xl"
                        style={{
                          backgroundColor: `#${
                            win.fields.backgroundHex
                              ? win.fields.backgroundHex
                              : "000000"
                          }`,
                        }}
                      >
                        <div className="text-black items-center text-center justify-center flex h-56 bg-white m-2 rounded-2xl">
                          {win.fields.image ? (
                            <Image
                              src={`https:${win.fields.image.fields.file.url}`}
                              width={150}
                              height={150}
                              alt="Picture of the author"
                            />
                          ) : (
                            <div>Image</div>
                          )}
                        </div>
                        <div className="w-full flex justify-center mt-6 text-3xl">
                          {win.fields.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
