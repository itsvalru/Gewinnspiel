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
              className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div>
                  <div className="text-4xl font-bold text-center mb-10">
                    {winCategoty.fields.name}
                  </div>
                  <div className="text-2xl font-bold flex">
                    {winCategoty.fields.wins.map((win, i) => (
                      <div key={i} className="mx-2">
                        {win.fields.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div>
                <div className="text-4xl font-bold text-center mb-10">
                  Gewinn Kategorie 3
                </div>
                <div className="text-2xl font-bold flex">
                  <div className="mx-2">Gewinn 1</div>
                  <div className="mx-2">Gewinn 2</div>
                  <div className="mx-2">Gewinn 3</div>
                  <div className="mx-2">Gewinn 4</div>
                  <div className="mx-2">Gewinn 5</div>
                </div>
              </div>
            </div>
          </section>
          <section
            ref={skills}
            className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div>
                <div className="text-4xl font-bold text-center mb-10">
                  Gewinn Kategorie 4
                </div>
                <div className="text-2xl font-bold flex">
                  <div className="mx-2">Gewinn 1</div>
                  <div className="mx-2">Gewinn 2</div>
                  <div className="mx-2">Gewinn 3</div>
                  <div className="mx-2">Gewinn 4</div>
                  <div className="mx-2">Gewinn 5</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
