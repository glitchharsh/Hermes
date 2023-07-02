import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["400", "500", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Button({ children, onClick }) {
  return (
    <button
      className={`${raleway.className} bg-[#5A4AE3] text-white font-medium uppercase py-3 px-6 rounded-[30px] min-w-[200px] font-bold text-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
