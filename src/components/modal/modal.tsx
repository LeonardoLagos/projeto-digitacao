import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute flex w-screen h-screen bg-blackPrimary/30 top-0 left-0 items-center justify-center">
      <div className="w-5/6 md:w-2/6 bg-white/95 rounded-lg p-1">
        {children}
      </div>
    </div>
  );
};

export default Modal;
