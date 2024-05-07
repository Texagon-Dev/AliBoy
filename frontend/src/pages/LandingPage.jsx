import CreateBookSection from "@/components/shared/CreateBookSection/CreateBookSection";
import Footer from "@/components/shared/Footer/Footer";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import TestimonialSection from "@/components/shared/TestimonialSection/TestimonialSection";

const LandingPage = () => {
  return (
    <div>
     
      <HeroSection />
      <CreateBookSection />
      <TestimonialSection />
      <Footer/>
    </div>
  );
};
export default LandingPage;
