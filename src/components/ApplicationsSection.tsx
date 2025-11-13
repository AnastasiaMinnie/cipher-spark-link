import { ApplicationCard } from "@/components/ApplicationCard";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ApplicationsSection = () => {
  const { isConnected } = useAccount();
  const [showForm, setShowForm] = useState(false);
  const [applications, setApplications] = useState([
    {
      id: "app-001-xyz",
      encryptedReason: "medical",
      encryptedIdentity: "john-d",
      amount: 5000,
      timestamp: "2 hours ago",
      verified: true,
    },
    {
      id: "app-002-abc",
      encryptedReason: "education",
      encryptedIdentity: "sarah-m",
      amount: 3000,
      timestamp: "5 hours ago",
      verified: false,
    },
    {
      id: "app-003-def",
      encryptedReason: "housing",
      encryptedIdentity: "mike-p",
      amount: 8000,
      timestamp: "1 day ago",
      verified: true,
    },
  ]);

  const handleSubmitApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newApp = {
      id: `app-${Date.now()}-new`,
      encryptedReason: formData.get('reason') as string,
      encryptedIdentity: formData.get('identity') as string,
      amount: parseInt(formData.get('amount') as string),
      timestamp: "Just now",
      verified: false,
    };
    setApplications([newApp, ...applications]);
    setShowForm(false);
    alert("Application submitted! Data encrypted with FHE.");
  };

  return (
    <section id="applications" className="py-24 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Aid Applications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse encrypted applications. All personal details remain confidential until verification.
          </p>
        </div>

        {!isConnected ? (
          <div className="max-w-md mx-auto">
            <WalletConnect />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Submit Application Button */}
            <div className="flex justify-center">
              <Button 
                variant="warm" 
                size="lg"
                onClick={() => setShowForm(!showForm)}
              >
                <Plus className="w-5 h-5" />
                Submit New Application
              </Button>
            </div>

            {/* Application Form */}
            {showForm && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 max-w-2xl mx-auto">
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Your Identity (will be encrypted)
                    </label>
                    <Input 
                      name="identity"
                      placeholder="e.g., John Doe"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Aid Reason (will be encrypted)
                    </label>
                    <Textarea 
                      name="reason"
                      placeholder="Describe your situation..."
                      required
                      className="bg-background/50 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Requested Amount ($)
                    </label>
                    <Input 
                      name="amount"
                      type="number"
                      placeholder="e.g., 5000"
                      required
                      min="1"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" variant="warm" className="flex-1">
                      Submit Application
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Applications Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <ApplicationCard key={app.id} {...app} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
