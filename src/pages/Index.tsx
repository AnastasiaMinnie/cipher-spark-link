import { HeroSection } from "@/components/HeroSection";
import { ApplicationsSection } from "@/components/ApplicationsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ApplicationsSection />
      <HowItWorksSection />
    </div>
  );
};

export default Index;
