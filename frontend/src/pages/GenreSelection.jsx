import horror from "../assets/Images/Horror.png";
import romance from "../assets/Images/Romance.png";
import comedy from "../assets/Images/comedy.png";
import fantasy from "../assets/Images/fantasy.png";
import action from "../assets/Images/Action.png";
import scifi from "../assets/Images/Scifi.png";
import mystery from "../assets/Images/Mystery.png";
import automate from "../assets/Images/Automate.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const genres = [
  { name: "Horror", image: horror },
  { name: "Romance", image: romance },
  { name: "Comedy", image: comedy },
  { name: "Fantasy", image: fantasy },
  { name: "Action", image: action },
  { name: "Sci-Fi", image: scifi },
  { name: "Mystery", image: mystery },
  { name: "Automate", image: automate },
];

const GenreSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);
  return (
    <section className="container mx-auto mt-[140px]">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
        <div className="w-full lg:w-[75%] mb-8">
          <h1 className="text-primary1-blue">Explore Diverse Story Genres</h1>
          <p className="text-[28px] leading-8 text-[#6B6D6E] font-thin py-4">
            Select the genre that best suits your imagination and let the AI
            weave its magic into your story
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-x-40  items-center relative">
          {genres.map((genre, index) => (
            <button
              key={index}
              className={`flex  justify-center items-center flex-col ${
                selectedGenre === index ? "border px-2 pt-1 rounded-lg " : ""
              }`}
              onClick={() => setSelectedGenre(index)}
            >
              <img className="mb-1" src={genre.image} alt={genre.name} />
              <div className="text-xl leading-5 tracking-tighter mb-4 font-bold">
                {genre.name}
              </div>
            </button>
          ))}
        </div>
        <NavLink to="/create/details">
          <Button className="bg-[#F15084] w-[232px] h-[56px] rounded-full hover:bg-[bg-[#F15084]] text-2xl leading-7 mt-6">
            Next
          </Button>
        </NavLink>
      </div>
    </section>
  );
};

export default GenreSelection;
