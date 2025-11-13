import { Heart, Lock } from "lucide-react";

export const Logo = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative">
        {/* Left Heart */}
        <Heart 
          className="absolute -left-6 top-0 w-8 h-8 fill-primary text-primary crypto-pulse"
          strokeWidth={1.5}
        />
        
        {/* Right Heart */}
        <Heart 
          className="absolute -right-6 top-0 w-8 h-8 fill-accent text-accent crypto-pulse"
          strokeWidth={1.5}
          style={{ animationDelay: '1s' }}
        />
        
        {/* Lock in Center */}
        <Lock 
          className="w-12 h-12 text-crypto-glow drop-shadow-lg"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
};
