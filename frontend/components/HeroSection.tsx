"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ArrowRight, Shield, Heart, Lock } from "lucide-react";

export const HeroSection = () => {
  const scrollToApplications = () => {
    document.getElementById('applications')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHow = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background" />
      
      {/* Floating Emoji Decorations */}
      <div className="absolute top-20 left-10 text-4xl float-animation opacity-60">💜</div>
      <div className="absolute top-32 right-20 text-3xl float-animation opacity-50" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-40 left-20 text-3xl float-animation opacity-50" style={{ animationDelay: '2s' }}>🌟</div>
      <div className="absolute bottom-32 right-10 text-4xl float-animation opacity-60" style={{ animationDelay: '0.5s' }}>💝</div>
      <div className="absolute top-1/2 left-5 text-2xl float-animation opacity-40" style={{ animationDelay: '1.5s' }}>🔐</div>
      <div className="absolute top-1/3 right-5 text-2xl float-animation opacity-40" style={{ animationDelay: '2.5s' }}>🛡️</div>
      
      {/* Soft Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[80px] animate-pulse-glow" 
           style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Logo with Emoji */}
          <div className="mb-4 animate-scale-in flex items-center gap-3">
            <span className="text-4xl emoji-bounce">🤝</span>
            <Logo />
            <span className="text-4xl emoji-bounce" style={{ animationDelay: '0.3s' }}>💫</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="block text-foreground mb-2 flex items-center justify-center gap-4">
              <span className="text-5xl md:text-6xl">🌸</span>
              HelpCrypt
              <span className="text-5xl md:text-6xl">🌸</span>
            </span>
            <span className="block gradient-text">
              Compassion with Confidentiality
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            <span className="inline-block mr-2">🔒</span>
            A privacy-preserving aid platform using FHE encryption. 
            Beneficiaries submit encrypted applications, donors verify needs 
            without exposing personal hardship details.
            <span className="inline-block ml-2">💕</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              variant="warm" 
              size="lg" 
              className="text-base px-8 py-6 rounded-2xl soft-shadow hover:scale-105 transition-all duration-300" 
              onClick={scrollToApplications}
            >
              <span className="mr-2">📋</span>
              View Applications
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-6 rounded-2xl border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300" 
              onClick={scrollToHow}
            >
              <span className="mr-2">💡</span>
              How It Works
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-16 text-sm">
            <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <span className="text-2xl animate-sparkle">🔐</span>
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-foreground/80">FHE Encrypted</span>
            </div>
            <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <span className="text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>🛡️</span>
              <Lock className="w-4 h-4 text-secondary" />
              <span className="text-foreground/80">Privacy Protected</span>
            </div>
            <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <span className="text-2xl animate-sparkle" style={{ animationDelay: '1s' }}>💜</span>
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-foreground/80">Verified Compassion</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-primary/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
