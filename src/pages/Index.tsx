import { HeroSection } from "@/components/HeroSection";
import { InterestsSection } from "@/components/InterestsSection";
import { MatchingSection } from "@/components/MatchingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <InterestsSection />
      <MatchingSection />
    </div>
  );
};

export default Index;
