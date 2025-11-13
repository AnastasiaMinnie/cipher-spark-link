import { Shield } from "lucide-react";

interface InterestBubbleProps {
  tag: string;
  isEncrypted?: boolean;
}

export const InterestBubble = ({ tag, isEncrypted = true }: InterestBubbleProps) => {
  return (
    <div className="relative group">
      <div className="gradient-bubble border border-primary/30 rounded-full px-6 py-3 
                      backdrop-blur-sm crypto-pulse hover:scale-105 transition-transform duration-300">
        <div className="flex items-center gap-2">
          {isEncrypted && (
            <Shield className="w-4 h-4 text-primary" />
          )}
          <span className="text-sm font-medium text-foreground">
            {isEncrypted ? "••••••" : tag}
          </span>
        </div>
      </div>
      
      {/* Hover tooltip */}
      {isEncrypted && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 
                        bg-card border border-border rounded-lg px-3 py-1 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        pointer-events-none whitespace-nowrap">
          <span className="text-xs text-muted-foreground">Encrypted: {tag}</span>
        </div>
      )}
    </div>
  );
};
