import CreateBookSection from "@/components/shared/CreateBookSection/CreateBookSection";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import TestimonialSection from "@/components/shared/TestimonialSection/TestimonialSection";

const LandingPage = () => {
  return (
    <div>
      {" "}
      <HeroSection />
      <CreateBookSection />
      <TestimonialSection/>
    </div>
  );
};
export default LandingPage;
