import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export const WalletConnect = () => {
  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <Wallet className="w-16 h-16 text-primary crypto-pulse" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Rainbow Wallet integration required to securely upload and encrypt your interest tags. 
            Your privacy is our priority.
          </p>
        </div>
        
        <Button variant="crypto" size="lg" className="w-full max-w-xs">
          <Wallet className="w-5 h-5" />
          Connect Rainbow Wallet
        </Button>
        
        <p className="text-xs text-muted-foreground">
          By connecting, you agree to encrypted data storage
        </p>
      </div>
    </Card>
  );
};
