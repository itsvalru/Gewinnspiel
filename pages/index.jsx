import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HorizontalGallery from "../components/HorizontalGallery";
import background from "../public/img/background.png";
import ESNLogo from "../public/img/ESNLogo.png";
import icon from "../public/img/icon.png";
import { client } from "../lib/contentful";
import { Wheel } from "../components/Wheel";
export default function Home({ winCategorys }) {
  console.log(winCategorys);
  const values = ["C", "D", "A", "B", "C", "D", "A", "B", "C", "D"];

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
      <div className="w-screen h-screen bg-white flex items-center justify-center text-black font-bold text-7xl">
        <p className="animate-bounce">Glücksrad</p>
        <Wheel values={values} />
      </div>{" "}
    </div>
  );
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "winCategory" });

  return {
    props: {
      winCategorys: response.items,
      revalidate: 70,
    },
  };
};
