import { InterestBubble } from "@/components/InterestBubble";
import { WalletConnect } from "@/components/WalletConnect";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const InterestsSection = () => {
  const sampleInterests = [
    "AI & Machine Learning",
    "Web3 Development",
    "Sustainable Tech",
    "Digital Art",
    "Crypto Trading",
    "DeFi Protocols",
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Encrypted Interests
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Add your interests as encrypted tags. They remain hidden until you match with someone who shares them.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interest Tags Display */}
          <Card className="p-8 bg-card/30 backdrop-blur-sm border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Active Tags</h3>
                <Button variant="outline" size="sm" className="border-primary/30">
                  <Plus className="w-4 h-4" />
                  Add Tag
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {sampleInterests.map((interest, index) => (
                  <InterestBubble 
                    key={index} 
                    tag={interest} 
                    isEncrypted={true}
                  />
                ))}
              </div>
              
              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">{sampleInterests.length}</span> interests encrypted
                </p>
              </div>
            </div>
          </Card>

          {/* Wallet Connection */}
          <div>
            <WalletConnect />
          </div>
        </div>
      </div>
    </section>
  );
};
