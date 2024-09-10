"use client";
import { useRouter } from "next/navigation";

import SectionMessage from "./section-message";
import Image from "next/image";
import RightArrow from "@/assets/images/contact-us/right-arrow.svg";

import Hero from "@/assets/images/contact-us/hero.svg";
import HeroTwo from "@/assets/images/contact-us/hero-two.svg";
import HeroThree from "@/assets/images/contact-us/hero-three.svg";

export default function ContactUs() {
  const router = useRouter();

  return (
    <section className="w-full large:pl-[112px] large:pr-[185px] tablet:px-6 pl-20 pr-[153px] gap-20 large:gap-[118px] h-max bg-white items-center overflow-hidden large:pb-[130px] tablet:pb-14 pb-24 tablet:flex flex-col tablet:gap-10 grid grid-cols-2">
      <div className="col-span-1  tablet:w-full">
        <div className="w-full max-w-[450px] tablet:max-w-full large:max-w-[538px]">
          <SectionMessage
            action={() => {
              router.push("https://www.analogueshifts.com/contact");
            }}
            title="Contact"
            highlighted="Us"
            buttonChildren={
              <>
                Send us a message <Image src={RightArrow} alt="" />
              </>
            }
            description="We’d love to hear from you. Leave us a message and we will get back to you as soon as possible"
          />
        </div>
      </div>
      <div className="col-span-1 tablet:w-max tablet:max-w-full tablet:ml-auto relative flex justify-end">
        <Image src={Hero} alt="" />
        <Image
          src={HeroTwo}
          alt=""
          className="absolute tablet:right-[50px] right-[-147px] tablet:bottom-[-50px] bottom-[-130px]"
        />
        <Image
          src={HeroThree}
          alt=""
          className="absolute tablet:-left-10 left-[-230px] tablet:top-0 top-[-70px]"
        />
      </div>
    </section>
  );
}
