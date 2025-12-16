"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, DollarSign, FileText, CheckCircle, XCircle, Clock, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ApplicationCardProps {
  id: number;
  applicant: string;
  publicAmount: number;
  timestamp: number;
  status: number; // 0: Pending, 1: Verified, 2: Rejected, 3: Funded
  donatedAmount: number;
  currentUserAddress?: string;
  onVerify?: (id: number, approved: boolean) => void;
  onDonate?: (id: number, amount: number) => void;
  onDecrypt?: (id: number) => void;
  isVerifying?: boolean;
  isDonating?: boolean;
  isDecrypting?: boolean;
  decryptedIdentity?: string;
  decryptedReason?: string;
  decryptedAmount?: number;
}

const statusConfig = {
  0: { label: "Pending Review", icon: Clock, emoji: "⏳", className: "text-yellow-400", bgClass: "bg-yellow-400/10" },
  1: { label: "Verified", icon: CheckCircle, emoji: "✅", className: "text-primary", bgClass: "bg-primary/10" },
  2: { label: "Rejected", icon: XCircle, emoji: "❌", className: "text-destructive", bgClass: "bg-destructive/10" },
  3: { label: "Fully Funded", icon: CheckCircle, emoji: "🎉", className: "text-green-400", bgClass: "bg-green-400/10" },
  4: { label: "Cancelled", icon: XCircle, emoji: "🚫", className: "text-gray-400", bgClass: "bg-gray-400/10" },
};

export const ApplicationCard = ({ 
  id, 
  applicant,
  publicAmount, 
  timestamp,
  status,
  donatedAmount,
  currentUserAddress,
  onVerify,
  onDonate,
  onDecrypt,
  isVerifying = false,
  isDonating = false,
  isDecrypting = false,
  decryptedIdentity,
  decryptedReason,
  decryptedAmount,
}: ApplicationCardProps) => {
  const [showDecrypted, setShowDecrypted] = useState(false);
  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig[0];
  const StatusIcon = statusInfo.icon;

  const isOwnApplication = currentUserAddress && 
    applicant.toLowerCase() === currentUserAddress.toLowerCase();

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const formatTimestamp = (ts: number) => {
    const date = new Date(ts * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now ⚡";
    if (hours < 24) return `${hours}h ago 🕐`;
    const days = Math.floor(hours / 24);
    return `${days}d ago 📅`;
  };

  const handleDecrypt = () => {
    if (onDecrypt) {
      onDecrypt(id);
      setShowDecrypted(true);
    }
  };

  const progressPercent = Math.min(100, Math.round((donatedAmount / publicAmount) * 100));

  return (
    <Card className={`p-6 glass-card rounded-3xl hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group ${isOwnApplication ? 'ring-2 ring-primary/40' : ''}`}>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center warm-pulse">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span>📋</span>
                Application #{id}
                {isOwnApplication && (
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    ✨ Yours
                  </span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">{formatTimestamp(timestamp)}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full ${statusInfo.className} ${statusInfo.bgClass}`}>
            <span>{statusInfo.emoji}</span>
            <StatusIcon className="w-3.5 h-3.5" />
            <span className="font-medium">{statusInfo.label}</span>
          </div>
        </div>

        {/* Encrypted Fields */}
        <div className="space-y-3">
          <div className="gradient-card rounded-2xl p-4 border border-primary/10 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👤</span>
              <User className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Identity (Encrypted)</span>
            </div>
            <p className="text-sm font-mono text-foreground">
              {showDecrypted && decryptedIdentity ? (
                <span className="flex items-center gap-2">
                  <span>🔓</span> {decryptedIdentity}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>🔐</span> ********{formatAddress(applicant)}
                </span>
              )}
            </p>
          </div>

          <div className="gradient-card rounded-2xl p-4 border border-primary/10 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📝</span>
              <FileText className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Aid Reason (Encrypted)</span>
            </div>
            <p className="text-sm font-mono text-foreground">
              {showDecrypted && decryptedReason ? (
                <span className="flex items-center gap-2">
                  <span>🔓</span> {decryptedReason}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>🔐</span> ********encrypted
                </span>
              )}
            </p>
          </div>

          <div className="gradient-card rounded-2xl p-4 border border-primary/10 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💰</span>
              <DollarSign className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Requested Amount</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              ${(showDecrypted && decryptedAmount ? decryptedAmount : publicAmount).toLocaleString()}
            </p>
            {donatedAmount > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>💝 Raised: ${donatedAmount.toLocaleString()}</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border/30 space-y-3">
          {/* Decrypt Button */}
          {onDecrypt && (
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full rounded-xl hover:bg-primary/5 transition-all"
                onClick={handleDecrypt}
                disabled={isDecrypting || showDecrypted}
              >
                {isDecrypting ? (
                  <>
                    <span className="mr-2 animate-spin">⏳</span>
                    Decrypting via FHE...
                  </>
                ) : showDecrypted ? (
                  <>
                    <span className="mr-2">🔓</span>
                    Decrypted
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    <span className="mr-2">🔐</span>
                    Decrypt Data
                  </>
                )}
              </Button>
              {!showDecrypted && (
                <p className="text-xs text-muted-foreground text-center">
                  🔑 Only applicant, verifier, or donor can decrypt
                </p>
              )}
            </div>
          )}

          {/* Verify Buttons */}
          {status === 0 && onVerify && !isOwnApplication && (
            <div className="flex gap-3">
              <Button 
                variant="warm" 
                className="flex-1 rounded-xl"
                onClick={() => onVerify(id, true)}
                disabled={isVerifying}
              >
                {isVerifying ? "⏳ Verifying..." : "✅ Approve"}
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1 rounded-xl"
                onClick={() => onVerify(id, false)}
                disabled={isVerifying}
              >
                ❌ Reject
              </Button>
            </div>
          )}

          {/* Own pending application message */}
          {status === 0 && isOwnApplication && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 rounded-xl p-3">
              <span className="text-lg">⏳</span>
              <AlertCircle className="w-4 h-4" />
              <span>Waiting for verification by another user</span>
            </div>
          )}

          {/* Donate Button */}
          {status === 1 && onDonate && (
            <Button 
              variant="warm" 
              className="w-full rounded-xl py-6 text-base"
              onClick={() => onDonate(id, publicAmount)}
              disabled={isDonating}
            >
              {isDonating ? (
                <>
                  <span className="mr-2 animate-spin">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="mr-2">💝</span>
                  Donate ${publicAmount.toLocaleString()}
                </>
              )}
            </Button>
          )}

          {/* Status Messages */}
          {status === 2 && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-xl p-3">
              <span className="text-lg">❌</span>
              <XCircle className="w-4 h-4" />
              <span>Verification failed - inconsistent data</span>
            </div>
          )}

          {status === 3 && (
            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 rounded-xl p-3">
              <span className="text-lg">🎉</span>
              <CheckCircle className="w-4 h-4" />
              <span>Fully funded - Thank you! 💜</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
