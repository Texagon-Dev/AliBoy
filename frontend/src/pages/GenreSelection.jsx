import horror from "../assets/Images/Horror.png";
import romance from "../assets/Images/Romance.png";
import comedy from "../assets/Images/comedy.png";
import fantasy from "../assets/Images/fantasy.png";
import action from "../assets/Images/Action.png";
import scifi from "../assets/Images/Scifi.png";
import mystery from "../assets/Images/Mystery.png";
import automate from "../assets/Images/Automate.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setGenre } from "@/redux/features/storySlice";
import { useDispatch } from "react-redux";

const genres = [
  { name: "Horror", image: horror, value: "horrorStory" },
  { name: "Romance", image: romance, value: "romanticStory" },
  { name: "Comedy", image: comedy, value: "comedyStory" },
  { name: "Fantasy", image: fantasy, value: "fantasyStory" },
  { name: "Action", image: action, value: "actionStory" },
  { name: "Sci-Fi", image: scifi, value: "scifiStory" },
  { name: "Mystery", image: mystery, value: "mysteryStory" },
  { name: "Automate", image: automate, value: "automateStory" },
];

const GenreSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();


   const handleNext = () => {
     if (selectedGenre !== null) {
       dispatch(setGenre(genres[selectedGenre].value));
       navigate("/create/details");
     } else {
       alert("Please select a genre.");
     }
   };
  return (
    <section className="container mx-auto lg:mt-[120px] md:mt-[100px] mt-[80px] mb-8">
      <div className="w-full flex justify-center items-center text-center flex-col   ">
        <div className="w-full lg:w-[80%] mb-8">
          <h1 className="text-primary1-blue text-2xl lg:text-5xl md:text-4xl arvo-bold md:leading-[59px]">
            Explore Diverse Story Genres
          </h1>
          <p className="text-xl lg:text-[28px]  leading-8 text-[#6B6D6E] raleway-medium py-4">
            Select the genre that best suits your imagination and let the AI
            weave its magic into your story
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-x-[130px]  items-center relative">
          {genres.map((genre, index) => (
            <button
              key={index}
              className={`flex  justify-center items-center flex-col ${
                selectedGenre === index ? "border px-2 pt-1 rounded-lg " : ""
              }`}
              onClick={() => setSelectedGenre(index)}
             
            >
              <img
                className="mb-2 w-[180px] h-[170px] "
                src={genre.image}
                alt={genre.name}
              />
              <div className="text-xl md:text-2xl  tracking-tighter mb-4 raleway-bold">
                {genre.name}
              </div>
            </button>
          ))}
        </div>

        <Button className="bg-[#F15084] w-[232px] h-[56px] rounded-full hover:bg-[bg-[#F15084]] text-2xl leading-7 mt-6 arvo-regular" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  );
};

export default GenreSelection;
