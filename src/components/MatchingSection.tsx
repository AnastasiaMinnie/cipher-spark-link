import { Card } from "@/components/ui/card";
import { Users, Shield, Sparkles } from "lucide-react";

export const MatchingSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your interests remain encrypted until mutual consent is given.",
    },
    {
      icon: Users,
      title: "Smart Matching",
      description: "Algorithm finds connections based on encrypted tag similarity.",
    },
    {
      icon: Sparkles,
      title: "Reveal Together",
      description: "Matches unlock only when both parties agree to connect.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A cryptographic approach to meaningful connections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 
                           transition-all duration-300 hover:scale-105 group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center 
                                  group-hover:bg-primary/20 transition-colors crypto-pulse">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
