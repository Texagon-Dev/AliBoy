import horror from "../assets/Images/Horror.png";
import romance from "../assets/Images/Romance.png";
import comedy from "../assets/Images/comedy.png";
import fantasy from "../assets/Images/fantasy.png";
import action from "../assets/Images/Action.png";
import scifi from "../assets/Images/Scifi.png";
import mystery from "../assets/Images/Mystery.png";
import automate from "../assets/Images/Automate.png";
import horror1 from "../assets/Images/Horror1.png";
import romance1 from "../assets/Images/Romance1.png";
import comedy1 from "../assets/Images/comedy1.png";
import fantasy1 from "../assets/Images/fantasy1.png";
import action1 from "../assets/Images/Action1.png";
import scifi1 from "../assets/Images/Scifi1.png";
import mystery1 from "../assets/Images/Mystery1.png";
import automate1 from "../assets/Images/Automate1.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setGenre } from "@/redux/features/storySlice";
import { useDispatch } from "react-redux";

const genres = [
  { name: "Horror", image: horror, imageHover: horror1, value: "horrorStory" },
  {
    name: "Romance",
    image: romance,
    imageHover: romance1,
    value: "romanticStory",
  },
  { name: "Comedy", image: comedy, imageHover: comedy1, value: "comedyStory" },
  {
    name: "Fantasy",
    image: fantasy,
    imageHover: fantasy1,
    value: "fantasyStory",
  },
  { name: "Action", image: action, imageHover: action1, value: "actionStory" },
  { name: "Sci-Fi", image: scifi, imageHover: scifi1, value: "scifiStory" },
  {
    name: "Mystery",
    image: mystery,
    imageHover: mystery1,
    value: "mysteryStory",
  },
  {
    name: "Automate",
    image: automate,
    imageHover: automate1,
    value: "automateStory",
  },
];

const styles = {
  container: "container mx-auto lg:mt-[120px] md:mt-[100px] mt-[80px] mb-8",
  mainWrapper: "w-full flex justify-center items-center text-center flex-col",
  contentWrapper: "w-full lg:w-[80%] flex justify-center items-center flex-col mb-8",
  title:
    "text-primary1-blue text-2xl lg:text-5xl md:text-4xl arvo-bold md:leading-[59px]",
  description:
    "text-xl lg:text-[28px]  leading-8 text-[#6B6D6E] raleway-medium py-4",
  gridContainer:
    "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-x-[130px]  items-center relative",
  genreButton: "flex  justify-center items-center flex-col",
  image:
    "mb-2 w-[180px] h-[170px] transition-transform duration-300 ease-in-out transform hover:scale-110",
  genreName: "text-xl md:text-2xl  tracking-tighter mb-4 raleway-bold",
  button:
    "bg-[#F15084] w-[232px] h-[56px] rounded-full hover:bg-[bg-[#F15084]] text-2xl leading-7 mt-6 arvo-regular",
};

const GenreSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [hoveredGenre, setHoveredGenre] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


   const handleNext = () => {
     if (selectedGenre !== null) {
       dispatch(setGenre(genres[selectedGenre]));
       navigate("/create/details");
     } else {
       alert("Please select a genre.");
     }
   };
  return (
    <section className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Explore Diverse Story Genres</h1>
          <p className={styles.description}>
            Select the genre that best suits your imagination and let the AI
            weave its magic into your story
          </p>
        </div>
        <div className={styles.gridContainer}>
          {genres.map((genre, index) => (
            <button
              key={index}
              className={styles.genreButton}
              onClick={() => setSelectedGenre(index)}
              onMouseEnter={() => setHoveredGenre(index)}
              onMouseLeave={() => setHoveredGenre(null)}
            >
              <img
                className={styles.image}
                src={
                  hoveredGenre === index || selectedGenre === index
                    ? genre.imageHover
                    : genre.image
                }
                alt={genre.name}
              />
              <div className={styles.genreName}>{genre.name}</div>
            </button>
          ))}
        </div>

        <Button className={styles.button} onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  );
};

export default GenreSelection;
