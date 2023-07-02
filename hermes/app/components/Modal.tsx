import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const Modal = ({ visible, setVisible, handleContentSend }) => {
  return (
    <div className="absolute min-w-[500px] min-h-[300px] bg-[#cfdaf4] left-1/3 shadow-2xl top-1/4 pt-3 pl-5">
      <p className={`${raleway.className} text-xl font-medium `}>
        Are you sure you want to send this message?
      </p>
      <div className="absolute bottom-3 flex px-20 gap-x-10">
        <button
          onClick={handleContentSend}
          className={`flex border-black p-3 border-2 w-[130px] gap-x-3 h-[53px] bg-green-600 justify-center items-center}`}
        >
          YES
        </button>
        <button
          onClick={() => setVisible(!visible)}
          className={`flex border-black p-3 border-2 w-[130px]  gap-x-3 h-[53px] bg-red-600 justify-center items-center}`}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default Modal;
