import { FooterSection } from "./Footer";
import HeroSection from "./HeroSection";
import Sections from "./Section";


export default function HomePage() {
  return (
    <main>
      
  <HeroSection />
  <div className="mt-[-4rem] relative z-10">
    <Sections />
  </div>
  <FooterSection/>
</main>

  );
}
