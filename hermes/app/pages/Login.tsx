import Image from "next/image";
import logo from "../images/logo.png";
import { Raleway } from "next/font/google";
import Button from "../components/Button"

const raleway = Raleway({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Login() {
  return (
    <div className={`${raleway.className} min-h-screen bg-[#ECFFFA] flex flex-col items-center align-center`}>
        <div 
        className="w-1/2 min-h-full flex flex-col justify-center items-center align-center">
        <div className="mt-5">
          <Image src={logo} alt="Hermes" 
          width={200} height={200}
          />
          <h2 className="text-3xl text-center mt-20 font-bold mb-12">LOGIN</h2>
        </div>
            <div className="flex flex-col items-center gap-3 mt-5">
                <input type="text" className="border-2 border-black px-3 py-5 min-w-[500px] text-lg"  placeholder="Your Email"/>
                <input type="password" className="border-2 border-black px-3 py-5 min-w-[500px] text-lg mb-12" placeholder="Your Password"/>
                <Button>Login</Button>
            </div>
        </div>
    </div>
  );
}
