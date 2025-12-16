"use client";

import { Card } from "@/components/ui/card";
import { Upload, Search, CheckCircle, Heart } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      emoji: "📝",
      title: "Submit Application",
      description: "Beneficiaries submit aid requests with encrypted personal details using FHE technology.",
      color: "primary",
    },
    {
      icon: Search,
      emoji: "🔍",
      title: "FHE Verification",
      description: "Donors verify need validity through encrypted computation without seeing raw data.",
      color: "secondary",
    },
    {
      icon: CheckCircle,
      emoji: "✅",
      title: "Approve & Verify",
      description: "System validates applications using homomorphic encryption algorithms.",
      color: "accent",
    },
    {
      icon: Heart,
      emoji: "💝",
      title: "Donate Securely",
      description: "Donors contribute directly to verified beneficiaries with full privacy protection.",
      color: "primary",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 text-4xl opacity-30 float-animation">🌈</div>
      <div className="absolute bottom-20 left-10 text-3xl opacity-30 float-animation" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute top-1/2 right-5 text-2xl opacity-20 float-animation" style={{ animationDelay: '2s' }}>💫</div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl emoji-bounce">🔮</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              How It Works
            </h2>
            <span className="text-4xl emoji-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="mr-2">🔐</span>
            Fully Homomorphic Encryption (FHE) enables verification without exposure
            <span className="ml-2">🛡️</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="p-6 glass-card rounded-3xl hover:border-primary/40 
                           transition-all duration-500 hover:scale-105 hover:-translate-y-2 group relative"
              >
                {/* Step Number with Emoji */}
                <div className="absolute -top-4 -left-2 flex items-center gap-1">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground 
                                  flex items-center justify-center font-bold text-lg soft-shadow">
                    {index + 1}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Icon with Emoji */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center 
                                    group-hover:bg-primary/20 transition-all duration-300 warm-pulse">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                      {step.emoji}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Additional Info Card */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="p-10 glass-card rounded-3xl relative overflow-hidden">
            {/* Decorative emojis */}
            <div className="absolute top-4 right-4 text-2xl opacity-50">🔒</div>
            <div className="absolute bottom-4 left-4 text-2xl opacity-50">💜</div>
            
            <div className="space-y-6 text-center relative z-10">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">🧬</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  What is FHE?
                </h3>
                <span className="text-3xl">🔐</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Fully Homomorphic Encryption allows computations to be performed on encrypted data 
                without decrypting it first. This means donors can verify the legitimacy of aid 
                applications without ever seeing the beneficiary&apos;s personal information, medical 
                records, or financial details. 
                <span className="inline-block ml-1">🛡️</span>
              </p>
              
              <div className="pt-6 grid grid-cols-3 gap-6 text-sm">
                <div className="glass-card p-4 rounded-2xl hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="text-3xl font-bold gradient-text mb-1">100%</div>
                  <div className="text-muted-foreground">Private</div>
                </div>
                <div className="glass-card p-4 rounded-2xl hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">👁️‍🗨️</div>
                  <div className="text-3xl font-bold gradient-text mb-1">Zero</div>
                  <div className="text-muted-foreground">Data Exposure</div>
                </div>
                <div className="glass-card p-4 rounded-2xl hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-3xl font-bold gradient-text mb-1">Full</div>
                  <div className="text-muted-foreground">Verification</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center gap-4 mt-12 text-2xl opacity-40">
          <span className="float-animation">💜</span>
          <span className="float-animation" style={{ animationDelay: '0.5s' }}>🌟</span>
          <span className="float-animation" style={{ animationDelay: '1s' }}>💝</span>
        </div>
      </div>
    </section>
  );
};
