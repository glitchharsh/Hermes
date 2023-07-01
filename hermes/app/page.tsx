import Image from "next/image";
import logo from "./images/logo.png";
import sms from "./images/sms.svg";
import email from "./images/email.svg";
import man from "./images/man.png";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ECFFFA] flex">
      <div className="w-1/4 border-r-2">
        <div className="bg-[#cfdaf4] mx-16 pt-7 px-10 flex flex-col gap-y-5 items-center pb-8">
          <p className={`${raleway.className} text-xl font-medium text-center`}>
            What you want to send today?
          </p>
          <button className="flex border-black p-3 border-2 w-[130px] items-center gap-x-3 h-[53px]">
            <Image src={sms} alt="sms" />
            <p className={`${raleway.className} font-medium uppercase`}>SMS</p>
          </button>
          <button className="flex border-black p-3 border-2 w-[130px] items-center gap-x-3 h-[53px]">
            <Image src={email} alt="sms" />
            <p className={`${raleway.className} font-medium uppercase`}>
              Email
            </p>
          </button>
        </div>
        <div className="flex flex-col gap-y-9">
          <p
            className={`${raleway.className} font-bold text-center mt-16 text-xl`}
          >
            Recent Generations
          </p>
          <div className="mx-16 border-2 h-[150px] bg-white"></div>
          <div className="mx-16 border-2 h-[150px] bg-white"></div>
          <div className="mx-16 border-2 h-[150px] bg-white"></div>
        </div>
      </div>
      <div className="w-1/2 min-h-full flex justify-center">
        <div className="mt-5">
          <Image src={logo} alt="Hermes" />
        </div>
      </div>
      <div className="w-1/4 min-h-full">
        <div className="flex items-center gap-x-3 mt-5 absolute right-7">
          <p>Username</p>
          <Image src={man} alt="user" />
        </div>
      </div>
    </div>
  );
}
