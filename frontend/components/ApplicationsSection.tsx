"use client";

import { ApplicationCard } from "@/components/ApplicationCard";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, RefreshCw } from "lucide-react";
import { useAccount } from "wagmi";
import { useState } from "react";
import { useHelpCrypt } from "@/hooks/useHelpCrypt";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";

export const ApplicationsSection = () => {
  const { isConnected } = useAccount();
  const { accounts } = useMetaMaskEthersSigner();
  const [showForm, setShowForm] = useState(false);
  
  // Get current user address from connected accounts
  const currentUserAddress = accounts && accounts.length > 0 ? accounts[0] : undefined;
  
  const {
    applications,
    isLoading,
    isSubmitting,
    isVerifying,
    isDonating,
    isDecrypting,
    submitApplication,
    verifyApplication,
    donate,
    decryptApplication,
    refreshApplications,
    checkContractExists,
    decryptedData,
    isDeployed,
    contractExists,
    contractAddress,
    message,
  } = useHelpCrypt();

  const handleSubmitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identity = formData.get('identity') as string;
    const reason = formData.get('reason') as string;
    const amount = parseInt(formData.get('amount') as string);
    
    await submitApplication(identity, reason, amount);
    setShowForm(false);
  };

  const handleVerify = async (id: number, approved: boolean) => {
    await verifyApplication(id, approved);
  };

  const handleDonate = async (id: number, amount: number) => {
    await donate(id, amount);
  };

  const handleDecrypt = async (id: number) => {
    await decryptApplication(id);
  };

  const handleRetryCheck = async () => {
    await checkContractExists();
    await refreshApplications();
  };

  // Show contract not deployed message
  if (contractExists === false || !isDeployed) {
    return (
      <section id="applications" className="py-24 px-4 bg-card/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <span className="text-6xl animate-bounce">⚠️</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span>🔌</span>
              Contract Not Deployed
              <span>🔌</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              HelpCrypt contract is not deployed at address:
            </p>
            <code className="text-sm glass-card px-4 py-2 rounded-xl border border-primary/20 text-primary inline-block">
              {contractAddress || "No address configured"}
            </code>
            
            <div className="mt-8 space-y-4 max-w-xl mx-auto">
              <Card className="p-6 glass-card rounded-2xl text-left">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span>🛠️</span> How to fix:
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    <div>
                      Start Hardhat node in a terminal:
                      <code className="block ml-2 mt-1 text-sm bg-background/50 px-3 py-1.5 rounded-lg">
                        npx hardhat node
                      </code>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    <div>
                      Deploy contracts in another terminal:
                      <code className="block ml-2 mt-1 text-sm bg-background/50 px-3 py-1.5 rounded-lg">
                        npx hardhat deploy --network localhost
                      </code>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    <div>
                      Regenerate ABI files in frontend:
                      <code className="block ml-2 mt-1 text-sm bg-background/50 px-3 py-1.5 rounded-lg">
                        cd frontend && pnpm run genabi
                      </code>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">4.</span>
                    Click the button below to retry ⬇️
                  </li>
                </ol>
              </Card>
              
              <Button 
                variant="warm" 
                size="lg"
                onClick={handleRetryCheck}
                className="w-full rounded-xl py-6"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                <span className="mr-2">🔄</span>
                Retry Connection
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="applications" className="py-24 px-4 bg-card/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 text-3xl opacity-20 float-animation">📋</div>
      <div className="absolute bottom-20 right-10 text-3xl opacity-20 float-animation" style={{ animationDelay: '1s' }}>💝</div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl emoji-bounce">📋</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Aid Applications
            </h2>
            <span className="text-4xl emoji-bounce" style={{ animationDelay: '0.2s' }}>💜</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="mr-2">🔐</span>
            Browse encrypted applications. All personal details remain confidential until verification.
            <span className="ml-2">✨</span>
          </p>
        </div>

        {!isConnected ? (
          <div className="max-w-md mx-auto">
            <WalletConnect />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="warm" 
                size="lg"
                onClick={() => setShowForm(!showForm)}
                className="rounded-xl px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span className="mr-2">📝</span>
                Submit New Application
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={refreshApplications}
                disabled={isLoading}
                className="rounded-xl px-6"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="mr-2">🔄</span>
                Refresh
              </Button>
            </div>

            {/* Status Message */}
            {message && (
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 glass-card rounded-xl">
                  <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                    <span>💬</span>
                    {message}
                  </p>
                </Card>
              </div>
            )}

            {/* Application Form */}
            {showForm && (
              <Card className="p-8 glass-card rounded-3xl max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl">📝</span>
                  <h3 className="text-xl font-semibold">New Aid Application</h3>
                </div>
                <form onSubmit={handleSubmitApplication} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <span>👤</span>
                      Your Identity (will be encrypted)
                    </label>
                    <Input 
                      name="identity"
                      placeholder="e.g., John Doe"
                      required
                      className="bg-background/50 rounded-xl mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <span>📋</span>
                      Aid Reason (will be encrypted)
                    </label>
                    <Textarea 
                      name="reason"
                      placeholder="Describe your situation..."
                      required
                      className="bg-background/50 min-h-[120px] rounded-xl mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <span>💰</span>
                      Requested Amount ($)
                    </label>
                    <Input 
                      name="amount"
                      type="number"
                      placeholder="e.g., 5000"
                      required
                      min="1"
                      className="bg-background/50 rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" variant="warm" className="flex-1 rounded-xl py-6" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 animate-spin">⏳</span>
                          Encrypting & Submitting...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">🔐</span>
                          Submit Application
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                      className="flex-1 rounded-xl py-6"
                    >
                      ❌ Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Applications Grid */}
            {isLoading ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4 animate-bounce">⏳</div>
                <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-muted-foreground text-lg">No applications yet. Be the first to submit! ✨</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app) => (
                  <ApplicationCard 
                    key={app.id}
                    id={app.id}
                    applicant={app.applicant}
                    publicAmount={app.publicAmount}
                    timestamp={app.timestamp}
                    status={app.status}
                    donatedAmount={app.donatedAmount}
                    currentUserAddress={currentUserAddress}
                    onVerify={handleVerify}
                    onDonate={handleDonate}
                    onDecrypt={handleDecrypt}
                    isVerifying={isVerifying}
                    isDonating={isDonating}
                    isDecrypting={isDecrypting}
                    decryptedIdentity={decryptedData[app.id]?.identity}
                    decryptedReason={decryptedData[app.id]?.reason}
                    decryptedAmount={decryptedData[app.id]?.amount}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
