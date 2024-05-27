import { EffectCards, Navigation } from "swiper/modules";
import avatar from "../../../assets/Images/avatar.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import "./testimonial.css";

const slidesData = [
  {
    id: 1,
    name: "John Doe",
    userName: "Random User",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis.",
    avatar: avatar,
  },
  {
    id: 2,
    name: "John Doe",
    userName: "Random User",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro laboriosam asperiores hic repudiandae sapiente quo tempora unde, et rem corrupti similique cumque nam ullam quidem! Optio, magni! Labore hic ab reprehenderit quas dolore quaerat harum nam! Vitae voluptatem repellendus nesciunt.",
    avatar: avatar,
  },
  {
    id: 3,
    name: "John Doe",
    userName: "Random User",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro laboriosam asperiores hic repudiandae sapiente quo tempora unde, et rem corrupti similique cumque nam ullam quidem! Optio, magni! Labore hic ab reprehenderit quas dolore quaerat harum nam! Vitae voluptatem repellendus nesciunt.",
    avatar: avatar,
  },
  {
    id: 4,
    name: "John Doe",
    userName: "Random User",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro laboriosam asperiores hic repudiandae sapiente quo tempora unde, et rem corrupti similique cumque nam ullam quidem! Optio, magni! Labore hic ab reprehenderit quas dolore quaerat harum nam! Vitae voluptatem repellendus nesciunt.",
    avatar: avatar,
  },
  {
    id: 5,
    name: "John Doe",
    userName: "Random User",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro laboriosam asperiores hic repudiandae sapiente quo tempora unde, et rem corrupti similique cumque nam ullam quidem! Optio, magni! Labore hic ab reprehenderit quas dolore quaerat harum nam! Vitae voluptatem repellendus nesciunt.",
    avatar: avatar,
  },
  // Add more slide data here
];

const TestimonialSection = () => {
  return (
    <section className="container mx-auto lg:py-14 md:py-10 py-10 ">
      <div className="w-full flex justify-center items-center  text-center flex-col   ">
        <div className="w-full lg:w-[60%]">
          <h1 className="text-primary1-blue text-4xl lg:text-[64px] lg:leading-[58px] arvo-bold mb-20 ">
            What Our Users Say About Us
          </h1>
        </div>

        <Swiper
          spaceBetween={80}
          centeredSlides={true}
          effect={"cards"}
          grabCursor={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[EffectCards, Navigation]}
          className="mySwiper"
        >
          {slidesData.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="flex flex-col justify-center items-center shadow-lg   "
            >
              <div className="relative z-20 pt-[50px] p-6 rounded-3xl  ">
                <img
                  className={`avatar-image absolute md:top-[-40px] top-2 left-1/2 transform -translate-x-1/2`}
                  src={slide.avatar}
                  alt="avatar"
                />

                <div className="flex flex-col justify-center items-center md:mt-5 mt-8 z-30">
                  <h1 className="arvo-bold md:text-2xl text-xs">
                    {slide.name}
                  </h1>
                  <span className="raleway-normal md:text-[16px] text-[10px]">
                    {slide.userName}
                  </span>
                </div>
                <div className="mt-8 md:text-[16px] text-[10px]">
                  {slide.text}
                </div>
              </div>

              <div className="swiper-slide-shadow swiper-slide-shadow-cards opacity-zero"></div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </section>
  );
};
export default TestimonialSection;
