import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Benefits } from "@/components/Benefits";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Industries />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
