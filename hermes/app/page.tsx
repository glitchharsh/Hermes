"use client";

import Image from "next/image";
import logo from "./images/logo.png";
import sms from "./images/sms.svg";
import email from "./images/email.svg";
import man from "./images/man.png";
import { Raleway } from "next/font/google";
import Select from "react-select";

const raleway = Raleway({
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const options = [
  { value: "cheerful", label: "Cheerful" },
  { value: "serious", label: "Serious" },
  { value: "casual", label: "Casual" },
  { value: "confident", label: "Confident" },
  { value: "inspirational", label: "Inspirational" },
  { value: "humorous", label: "Humorous" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ECFFFA] flex">
      <div className="w-1/4 border-r-2">
        <div className="bg-[#cfdaf4] mx-16 pt-7 px-10 flex flex-col gap-y-5 items-center pb-8">
          <p className={`${raleway.className} text-xl font-medium text-center`}>
            What you want to send today?
          </p>
          <button className="flex border-black p-3 border-2 w-[130px] items-center gap-x-3 h-[53px] hover:bg-white">
            <Image src={sms} alt="sms" />
            <p className={`${raleway.className} font-medium uppercase`}>SMS</p>
          </button>
          <button className="flex border-black p-3 border-2 w-[130px] items-center gap-x-3 h-[53px] hover:bg-white">
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
      <div className="w-1/2 min-h-full flex flex-col">
        <div className="mt-5 mx-auto">
          <Image src={logo} alt="Hermes" />
        </div>
        <div className="mx-12">
          <p
            className={`${raleway.className} font-bold mt-16 text-xl text-left`}
          >
            Enter prompt to generate SMS Text
          </p>
          <textarea
            className="border-2 h-[120px] w-full mt-3 pl-2 pt-2"
            placeholder="Tell us what you want to write..."
          />
          <textarea
            className="border-2 h-[400px] w-full mt-10 pl-2 pt-2"
            placeholder="Generated text.."
          />
        </div>
        <div className="mx-auto">
          <button
            className={`${raleway.className} bg-[#5A4AE3] text-white uppercase rounded-[30px] py-2 px-[51px] mt-12 font-extrabold`}
          >
            SEND
          </button>
        </div>
        <p
          className={`${raleway.className} text-center mt-14 font-medium text-xl`}
        >
          AI-Powered Messaging, Simplified:{" "}
          <p className="text-[#0500FF] inline">Hermes</p> - Send with Impact
        </p>
      </div>
      <div className="w-1/4 min-h-full">
        <div className="flex items-center gap-x-3 mt-5 absolute right-7">
          <p>Username</p>
          <Image src={man} alt="user" />
        </div>
        <div className="mt-24 mx-6 flex flex-col items-center gap-y-7">
          <p
            className={`${raleway.className} font-bold mt-16 text-xl text-center`}
          >
            Select Configurations
          </p>
          <div className="border-2 border-black px-3 py-5">
            <input type="range" className="w-[200px]" />
            <div className="flex justify-between">
              <p className={`${raleway.className} font-medium text-base`}>
                Formality
              </p>
              <p className={`${raleway.className} font-medium text-base`}>
                50%
              </p>
            </div>
          </div>
          <div className="border-2 border-black px-3 py-5 w-[230px] flex justify-between items-center">
            <p className={`${raleway.className} font-medium text-base`}>Tone</p>
            <Select options={options} />
          </div>
          <div className="border-2 border-black px-3 py-5">
            <input type="range" className="w-[200px]" />
            <div className="flex justify-between">
              <p className={`${raleway.className} font-medium text-base`}>
                Characters
              </p>
              <p className={`${raleway.className} font-medium text-base`}>
                150
              </p>
            </div>
          </div>
          <div className="border-black border-2 flex flex-col mt-28 py-3 px-4 gap-y-3">
            <p className={`${raleway.className} font-medium text-base`}>
              Upload Contact Numbers
            </p>
            <div className="mx-auto">
              <button
                className={`${raleway.className} bg-[#5A4AE3] text-white uppercase rounded-[30px] py-2 px-[51px] font-extrabold`}
              >
                upload
              </button>
            </div>
            <div className="w-[150px]">
              <p className={`${raleway.className} font-bold text-base italic`}>
                Supported Formats excel, csv
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
