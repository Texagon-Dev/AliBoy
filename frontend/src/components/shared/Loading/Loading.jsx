import { useEffect, useState } from "react";
import Loading1 from "@/assets/Images/Loading/1.png";
import Loading2 from "@/assets/Images/Loading/2.png";
import Loading3 from "@/assets/Images/Loading/3.png";
import Loading4 from "@/assets/Images/Loading/4.png";
import Loading5 from "@/assets/Images/Loading/5.png";
import Loading6 from "@/assets/Images/Loading/6.png";
import Loading7 from "@/assets/Images/Loading/7.png";
import Loading8 from "@/assets/Images/Loading/8.png";
import "./loading.css"
const loadingImages = [
  { src: Loading1, animation: "animate-bounce" },
  { src: Loading2, animation: "animate-spin" },
  { src: Loading3, animation: "animate-ping" },
  { src: Loading4, animation: "animate-pulse" },
  { src: Loading5, animation: "animate-bounce" },
  { src: Loading6, animation: "animate-spin" },
  { src: Loading7, animation: "animate-ping" },
  { src: Loading8, animation: "animate-pulse" },
];

const Loading = () => {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    
    const randomIndex = Math.floor(Math.random() * loadingImages.length);
    setCurrentImage(loadingImages[randomIndex]);
  }, []);

  if (!currentImage) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src={currentImage.src}
        alt="Loading"
        className={`${currentImage.animation} `}
      />
    </div>
  );
};

export default Loading;


export const LoadingComp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingImages.length);
    }, 1000); // Change image every 1 second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const currentImage = loadingImages[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center ">
      <img
        src={currentImage.src}
        alt="Loading"
        className={`${currentImage.animation}`}
      />
      {/* <p className="mt-4 text-xl font-semibold">{currentImage.genre}</p> */}
    </div>
  );
};