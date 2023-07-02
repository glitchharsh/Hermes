"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import { Raleway } from "next/font/google";
import Button from "../../components/Button";
import Select from "react-select";
import useRegister from "@/app/hooks/useRegister";
import { useRouter } from "next/navigation";

const raleway = Raleway({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const options = [
  {
    value: "MALE",
    label: "Male",
  },
  {
    value: "FEMALE",
    label: "Female",
  },
];

export default function Signup() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    const data = await useRegister(
      name,
      phoneNumber,
      email,
      age,
      gender,
      password
    );
    alert(data);
    router.push("/pages/sms");
  };

  return (
    <div
      className={`${raleway.className} min-h-screen bg-[#ECFFFA] flex flex-col items-center align-center`}
    >
      <div className="w-1/2 min-h-full flex flex-col justify-center items-center align-center">
        <div className="mt-5">
          <Image src={logo} alt="Hermes" width={200} height={200} />
          <h2 className="text-3xl text-center mt-20 font-bold mb-12">SIGNUP</h2>
        </div>
        <div className="flex flex-col items-center gap-3 mt-5">
          <input
            type="text"
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg"
            placeholder="Your Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg"
            placeholder="Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Select
            options={options}
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg"
            value={gender?.value}
            onChange={(selectedOption) => setGender(selectedOption?.value)}
          />
          <input
            type="password"
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg mb-12"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleSignup}>SIGNUP</Button>
        </div>
      </div>
    </div>
  );
}
