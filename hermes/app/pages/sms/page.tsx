"use client";

import Image from "next/image";
import logo from "../../images/logo.png";
import sms from "../../images/sms.svg";
import email from "../../images/email.svg";
import man from "../../images/man.png";
import { Raleway } from "next/font/google";
import Select from "react-select";
import { useState } from "react";
import useGenerator from "@/app/hooks/useGenerator";
import Recent from "@/app/components/Recent";
import { useUserDataContext } from "@/app/context/context";
import Modal from "@/app/components/Modal";

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

const options1 = [
  { value: "text", label: "TEXT" },
  { value: "html", label: "HTML" },
];

export default function Home() {
  //@ts-ignore
  const { token, name } = useUserDataContext();

  const [type, setType] = useState("sms");
  const [formality, setFormality] = useState(50);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Cheerful");
  const [maxChars, setMaxChars] = useState(150);
  const [generatedText, setGeneratedText] = useState("");
  const [emailType, setEmailType] = useState("text");

  const [visible, setVisible] = useState(false);

  const handleGenerate = async (e: any) => {
    e.preventDefault();
    if (prompt.trim() === "") {
      alert("Please enter a prompt");
      return;
    }
    const the_type = type === "sms" ? "sms" : emailType + " email";
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data: any = await useGenerator({
      prompt,
      tone,
      formality,
      maxChars,
      the_type,
      token,
    });
    setGeneratedText(data);
  };

  const handleContentSend = async (e: any) => {
    e.preventDefault();
    if (generatedText.trim() === "") {
      alert("Please generate text first");
      return;
    }
    if (type === "sms") {
      alert("SMS sent");
    } else {
      alert("Email sent");
    }
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  return (
    <div className="min-h-screen bg-[#ECFFFA] flex">
      {visible && (
        <Modal
          visible={visible}
          setVisible={setVisible}
          handleContentSend={handleContentSend}
        />
      )}
      <div className="w-1/4 border-r-2">
        <div className="bg-[#cfdaf4] mx-16 pt-7 px-10 flex flex-col gap-y-5 items-center pb-8">
          <p className={`${raleway.className} text-xl font-medium text-center`}>
            What you want to send today?
          </p>
          <button
            className={`flex border-black p-3 border-2 w-[130px] items-center gap-x-3 h-[53px] hover:bg-white ${
              type === "sms" && "bg-white"
            }`}
            onClick={() => setType("sms")}
          >
            <Image src={sms} alt="sms" />
            <p className={`${raleway.className} font-medium uppercase`}>SMS</p>
          </button>
          <button
            className={`flex border-black p-3 border-2 w-[130px] items-center gap-x-3 h-[53px] hover:bg-white ${
              type === "email" && "bg-white"
            }`}
            onClick={() => setType("email")}
          >
            <Image src={email} alt="sms" />
            <p className={`${raleway.className} font-medium uppercase`}>
              Email
            </p>
          </button>
        </div>
            <Recent type={type} />
      </div>
      <div className="w-1/2 min-h-full flex flex-col">
        <div className="mt-5 mx-auto">
          <Image src={logo} alt="Hermes" />
        </div>
        <div className="mx-12">
          <p
            className={`${raleway.className} font-bold mt-16 text-xl text-left`}
          >
            Enter prompt to generate {type.toUpperCase()} Text
          </p>
          <textarea
            className="border-2 h-[120px] w-full mt-3 pl-2 pt-2"
            placeholder="Tell us what you want to write..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          {generatedText && (
            <textarea
              className="border-2 h-[400px] w-full mt-10 pl-2 pt-2"
              placeholder="Generated text.."
              defaultValue={generatedText}
            />
          )}
        </div>
        <div className="mx-auto">
          {!generatedText ? (
            <button
              className={`${raleway.className} bg-[#5A4AE3] text-white uppercase rounded-[30px] py-2 px-[51px] mt-12 font-extrabold`}
              onClick={handleGenerate}
            >
              GENERATE
            </button>
          ) : (
            <button
              className={`${raleway.className} bg-[#5A4AE3] text-white uppercase rounded-[30px] py-2 px-[51px] mt-12 font-extrabold`}
              onClick={openModal}
            >
              SEND {type.toUpperCase()}
            </button>
          )}
        </div>
        <div
          className={`${raleway.className} text-center mt-14 font-medium text-xl`}
        >
          AI-Powered Messaging, Simplified:{" "}
          <p className="text-[#0500FF] inline">Hermes</p> - Send with Impact
        </div>
      </div>
      <div className="w-1/4 min-h-full">
        <div className="flex items-center gap-x-3 mt-5 absolute right-7">
          <p>{name}</p>
          <Image src={man} alt="user" />
        </div>
        <div className="mt-24 mx-6 flex flex-col items-center gap-y-7">
          <p
            className={`${raleway.className} font-bold mt-16 text-xl text-center`}
          >
            Select Configurations
          </p>
          <div className="border-2 border-black px-3 py-5">
            <input
              type="range"
              className="w-[200px]"
              onChange={(e) => setFormality(Number(e.target.value))}
            />
            <div className="flex justify-between">
              <p className={`${raleway.className} font-medium text-base`}>
                Formality
              </p>
              <p className={`${raleway.className} font-medium text-base`}>
                {formality}%
              </p>
            </div>
          </div>
          <div className="border-2 border-black px-3 py-5 w-[230px] flex justify-between items-center">
            <p className={`${raleway.className} font-medium text-base`}>Tone</p>
            <Select
              options={options}
              defaultValue={options[0]}
              onChange={(e) => {
                if (e) setTone(e.value);
                else setTone(options[0].value);
              }}
            />
          </div>
          {type === "sms" && (
            <div className="border-2 border-black px-3 py-5">
              <input
                type="range"
                className="w-[200px]"
                onChange={(e) =>
                  setMaxChars(Math.floor(Number(e.target.value) * 1.5))
                }
                value={maxChars / 1.5}
              />
              <div className="flex justify-between">
                <p className={`${raleway.className} font-medium text-base`}>
                  Characters
                </p>
                <p className={`${raleway.className} font-medium text-base`}>
                  {maxChars}
                </p>
              </div>
            </div>
          )}
          {type === "email" && (
            <div className="border-2 border-black px-3 py-5 w-[230px] flex justify-between items-center">
              <p className={`${raleway.className} font-medium text-base`}>
                Type
              </p>
              <Select
                options={options1}
                defaultValue={options1[0]}
                onChange={(e) => {
                  if (e) setEmailType(e.value);
                  else setEmailType(options1[0].value);
                }}
              />
            </div>
          )}
          <div className="border-black border-2 flex flex-col mt-28 py-3 px-4 gap-y-3">
            {type === "sms" && (
              <p className={`${raleway.className} font-medium text-base`}>
                Upload Contact Numbers
              </p>
            )}
            {type === "email" && (
              <p className={`${raleway.className} font-medium text-base`}>
                Upload Email ID&#39;s
              </p>
            )}
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
