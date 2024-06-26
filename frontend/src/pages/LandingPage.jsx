import CreateBookSection from "@/components/shared/CreateBookSection/CreateBookSection";
import Footer from "@/components/shared/Footer/Footer";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import TestimonialSection from "@/components/shared/TestimonialSection/TestimonialSection";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Landing Page</title>
      </Helmet>
      <HeroSection />
      <CreateBookSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};
export default LandingPage;
