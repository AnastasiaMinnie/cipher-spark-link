import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, DollarSign, FileText, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface ApplicationCardProps {
  id: string;
  encryptedReason: string;
  encryptedIdentity: string;
  amount: number;
  timestamp: string;
  verified?: boolean;
}

export const ApplicationCard = ({ 
  id, 
  encryptedReason, 
  encryptedIdentity, 
  amount, 
  timestamp,
  verified = false 
}: ApplicationCardProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate FHE verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsApproved(Math.random() > 0.3); // 70% approval rate for demo
    }, 2000);
  };

  const handleDonate = () => {
    alert(`Donation of $${amount} initiated for application ${id}`);
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center warm-pulse">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Application #{id.slice(0, 8)}</h3>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
          {verified && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <CheckCircle className="w-4 h-4" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Encrypted Fields */}
        <div className="space-y-3">
          <div className="gradient-card rounded-lg p-3 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Identity (Encrypted)</span>
            </div>
            <p className="text-sm font-mono text-foreground">••••••••{encryptedIdentity}</p>
          </div>

          <div className="gradient-card rounded-lg p-3 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Aid Reason (Encrypted)</span>
            </div>
            <p className="text-sm font-mono text-foreground">••••••••{encryptedReason}</p>
          </div>

          <div className="gradient-card rounded-lg p-3 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Requested Amount</span>
            </div>
            <p className="text-lg font-semibold text-foreground">${amount.toLocaleString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border/50">
          {isApproved === null ? (
            <Button 
              variant="warm" 
              className="w-full"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying via FHE..." : "Verify Need"}
            </Button>
          ) : isApproved ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 rounded-md p-2">
                <CheckCircle className="w-4 h-4" />
                <span>Application verified as legitimate</span>
              </div>
              <Button 
                variant="warm" 
                className="w-full"
                onClick={handleDonate}
              >
                Donate ${amount}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md p-2">
              <XCircle className="w-4 h-4" />
              <span>Verification failed - inconsistent data</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
