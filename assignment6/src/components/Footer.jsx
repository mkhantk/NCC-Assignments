import React from "react";
import useAppContext from "./useAppContext";

function Footer() {
  const { state } = useAppContext();
  const { isLogin } = state;
  return (
    isLogin && (
      <div className="w-full flex justify-center items-center pt-8 pb-2">
        <p>Made with ❤️ by Min Khant Kyaw</p>
      </div>
    )
  );
}

export default Footer;
