import { useEffect, useState } from "react";

const ButtonAdver = ({ children }) => {
  const [colorIndex, setColorIndex] = useState(0);

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-space-500",
    "bg-pink-500",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalId);
  }, [colors.length]);

  return (
    <a href="#" className={`px-4 py-2 text-white rounded transition duration-500 cursor-pointer font-montserrat ${colors[colorIndex]}`}>
      { children }
    </a>
  );
};

export default ButtonAdver;
