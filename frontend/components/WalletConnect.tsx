"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export const WalletConnect = () => {
  return (
    <Card className="p-8 glass-card rounded-3xl border-primary/20">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="text-6xl emoji-bounce">👛</div>
          <span className="absolute -top-1 -right-1 text-2xl animate-sparkle">✨</span>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
            <span>🔗</span>
            Connect Your Wallet
            <span>🔗</span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            <span className="mr-1">🔐</span>
            Wallet required to submit applications, donate, or verify beneficiaries. 
            All data remains encrypted with FHE technology.
            <span className="ml-1">💜</span>
          </p>
        </div>
        
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
                className="w-full max-w-xs"
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 warm-glow transition-all duration-300 h-12 rounded-2xl px-8 inline-flex items-center justify-center gap-2 font-medium hover:scale-105"
                      >
                        <span className="text-lg">👛</span>
                        Connect Wallet
                        <span className="text-lg">✨</span>
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button 
                        onClick={openChainModal}
                        className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 h-12 rounded-2xl px-8 font-medium"
                      >
                        <span className="mr-2">⚠️</span>
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={openChainModal}
                        className="flex items-center gap-2 glass-card border border-border hover:bg-muted/50 h-12 rounded-2xl px-4 transition-all hover:scale-105"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 24,
                              height: 24,
                              borderRadius: 999,
                              overflow: 'hidden',
                            }}
                          >
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                width={24}
                                height={24}
                              />
                            )}
                          </div>
                        )}
                        <span className="text-sm font-medium">{chain.name}</span>
                      </button>

                      <button
                        onClick={openAccountModal}
                        className="flex-1 bg-primary/10 border border-primary/30 hover:bg-primary/20 h-12 rounded-2xl px-4 font-medium text-sm transition-all hover:scale-105"
                      >
                        <span className="mr-1">🎭</span>
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground glass-card px-4 py-2 rounded-full">
          <span>🔒</span>
          <span>Encrypted data storage with FHE</span>
          <span>🛡️</span>
        </div>
      </div>
    </Card>
  );
};

