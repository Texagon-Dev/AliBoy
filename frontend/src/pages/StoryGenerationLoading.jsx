import generatingstory from "../assets/Images/generatingstory.png";

const StoryGenerationLoading = () => {
  return (
    <section className="bg-secondary1-pink w-full h-screen flex flex-col justify-center items-center z-9999 ">
      <img
        className="w-[624px] h-[412px]"
        src={generatingstory}
        alt="generating story loading screen"
      />
      <h1 className="text-3xl lg:text-5xl arvo-bold text-primary1-blue mt-4 animate-bounce ">
        Generating Story
      </h1>
      <p className=" text-xl lg:text-[28px] leading-8  text-primary1-blue mt-8 text-center lg:w-[60%]  raleway-medium">
        Observe as AI brings your ideas to life! Sit back and witness the magic
        unfold as your story is crafted with precision and creativity
      </p>
    </section>
  );
};
export default StoryGenerationLoading;
