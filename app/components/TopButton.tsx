"use client";

import { useEffect, useRef } from "react";

const TopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 256) {
        buttonRef.current?.classList.remove("opacity-0");
        buttonRef.current?.classList.add("opacity-100");
      } else {
        buttonRef.current?.classList.remove("opacity-100");
        buttonRef.current?.classList.add("opacity-0");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      className={`fixed bottom-4 left-4 bg-sky-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-sky-600  hidden lg:block opacity-0 transition-all duration-300`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ref={buttonRef}>
      Back to top
    </button>
  );
};

export default TopButton;
