import share from "../../../assets/Images/share.png";
import imagination from "../../../assets/Images/Imagination.png";
import receive from "../../../assets/Images/receive.png";

const CreateBookSection = () => {
  return (
    <section className="container mx-auto lg:py-40 md:py-20 py-10 ">
      <div className="w-full flex justify-center items-center  text-center flex-col   mb-10">
        <div className="w-full lg:w-[70%]">
          <h1 className="text-primary1-blue text-4xl lg:text-[64px] lg:leading-[58px] arvo-bold ">
            60 Seconds To Create Your Own Book
          </h1>
          <p className="text-2xl text-[#6B6D6E] raleway-normal py-4">
            Discover the seamless process of turning your ideas into beautifully
            crafted storybooks with our intuitive AI platform
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:z-20  items-center  relative">
        <div className="flex justify-center items-center text-center flex-col  lg:z-20">
          <img className="mb-10" src={share} alt="" />
          <h1 className="text-xl leading-5 tracking-tighter mb-4 arvo-bold">
            Receive Your Masterpiece
          </h1>
          <p className="lg:px-24 md:px-18 text-center raleway-normal text-[#6B6D6E]">
            Sit back and relax as we craft and deliver the hard copy of your
            personalized storybook right to your doorstep.
          </p>
        </div>
        <div className="flex justify-center items-center text-center flex-col  lg:z-20 ">
          <img className="mb-10" src={imagination} alt="" />
          <h1 className="text-xl mb-4  leading-5 tracking-tighter arvo-bold ">
            See Your Imagination Unfold
          </h1>
          <p className="lg:px-24 md:px-18 text-center raleway-normal text-[#6B6D6E]">
            Watch as your ideas transform into captivating stories, brought to
            life by our AI-powered platform
          </p>
        </div>
        <div className="flex justify-center items-center text-center flex-col  lg:z-20">
          <img className="mb-10" src={receive} alt="" />
          <h1 className="text-[20px] mb-4  leading-5 tracking-tighter arvo-bold">
            Receive Your Masterpiece
          </h1>
          <p className="lg:px-24 md:px-18 text-center raleway-normal text-[#6B6D6E]">
            Sit back and relax as we craft and deliver the hard copy of your
            personalized storybook right to your doorstep.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <hr className="hidden lg:flex w-[68%] px-10 lg:z-0 top-10  absolute transform translate-x-1/2  border-b-2 border-dashed border-[#D5D7DD]" />
        </div>
      </div>
    </section>
  );
};
export default CreateBookSection;
