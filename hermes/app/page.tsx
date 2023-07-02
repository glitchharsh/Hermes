"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "./images/logo.png";
import { Raleway } from "next/font/google";
import Button from "./components/Button";
import Link from "next/link";
import useLogin from "./hooks/useLogin";
import { useRouter } from "next/navigation";
import { useUserDataContext } from "./context/context";

const raleway = Raleway({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { token, setToken } = useUserDataContext();

  const handleLogin = async () => {
    console.log("Login data:", {
      email,
      password,
    });
    const data = await useLogin(email, password);
    console.log("Data", data);
    if (data && data.access) {
      setToken(data.access);
      console.log("Token", token);
      alert("Login successful");
      router.push("/pages/sms");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className={`${raleway.className} min-h-screen bg-[#ECFFFA] flex flex-col items-center align-center`}
    >
      <div className="w-1/2 min-h-full flex flex-col justify-center items-center align-center">
        <div className="mt-5">
          <Image src={logo} alt="Hermes" width={200} height={200} />
          <h2 className="text-3xl text-center mt-20 font-bold mb-12">LOGIN</h2>
        </div>
        <div className="flex flex-col items-center gap-3 mt-5">
          <input
            type="text"
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border-2 border-black px-3 py-5 min-w-[500px] text-lg mb-12"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
        <Link href="/pages/signup">
          <p className="mt-5 text-xl font-bold">New User? Signup</p>
        </Link>
      </div>
    </div>
  );
}
