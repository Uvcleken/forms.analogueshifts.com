import Image from "next/image";
import DownloadAppBtn from "../download-app-btn";

import PreviewOne from "@/assets/images/download-app/preview-one.png";
import PreviewTwo from "@/assets/images/download-app/preview-two.png";

export default function DownloadApp() {
  return (
    <section
      style={{
        backgroundImage: "url(/lines-bg.png)",
      }}
      className={`w-full max-w-[1650px] mx-auto items-start md:items-end flex md:flex-row flex-col gap-[55px] relative bg-no-repeat bg-cover overflow-hidden tablet:pt-14  pt-24 large:pt-[168px] tablet:px-6 px-20 large:px-[112px] bg-background-darkYellow`}
    >
      <div className="flex tablet:pb-14 pb-24 large:pb-[168px] flex-col max-w-full w-max">
        <h3
          className={` font-semibold tablet:text-2xl tablet:leading-8 text-[28px] large:text-[32px] leading-64 mb-3 text-primary-boulder950`}
        >
          Looking for a job?
        </h3>
        <p
          className={`max-w-[500px] w-max tablet:w-10/12 text-[#907222] tablet:leading-8 tablet:text-base text-xl  font-normal leading-[48px]`}
        >
          Download Analogue Shift’s app for global remote tech job opportunities
          and job postings on the go!
        </p>
        <div className="flex max-w-full items-center tablet:gap-4 flex-wrap gap-8 mt-8  h-max">
          <DownloadAppBtn platform="playstore" />
          <DownloadAppBtn platform="appstore" />
        </div>
      </div>

      <div className="hidden lg:flex justify-end items-end  absolute w-max overflow-hidden p-0 right-14 -bottom-1 h-[calc(100%-200px)] xl:h-[calc(100%-80px)] large:h-max">
        <Image
          src={PreviewOne}
          alt=""
          className="z-20  large:translate-x-[74px] translate-x-[50px] xl:max-w-[38%] max-w-[25%] large:max-w-[50%]  h-max large:max-h-none max-h-full"
        />
        <Image
          src={PreviewTwo}
          alt=""
          className="-translate-x-[51px] z-10 large:max-h-none xl:max-w-[38%] max-w-[25%] large:max-w-[50%]  h-max max-h-full"
        />
      </div>
    </section>
  );
}
