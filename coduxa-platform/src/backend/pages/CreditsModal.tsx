import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CreditCard as CardIcon, Shield, RefreshCw, Zap, CheckCircle } from "lucide-react";
import { supabase } from "../../components/lib/supabaseClient";
import paymentService from "../../services/paymentService.ts";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCredits } from "../../services/CreditsContext.tsx";

const creditPacks = [
  { title: "Starter Pack",  price: "₱150", credits: 15, description: "Perfect for beginners" },
  { title: "Popular Pack",  price: "₱300", credits: 40, popular: true, description: "Best value for serious learners" },
  { title: "Pro Pack",      price: "₱600", credits: 100, description: "For certification masters" },
];

const features = [
  { icon: Shield,    title: "Secure Payment", description: "All transactions are processed securely through our trusted payment partners" },
  { icon: RefreshCw, title: "Money-Back",     description: "14-day refund policy if you're not satisfied" },
  { icon: Zap,       title: "Instant Credits", description: "Credits are instantly added to your account after successful payment" },
];

function parsePeso(price: string) {
  // "₱300" -> 300
  const num = Number(price.replace(/[^\d.]/g, ""));
  return Math.round(num * 100) / 100; 
}

export default function CreditsPage() {
  const { credits, refresh } = useCredits();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "success") {
      refresh().catch(() => {});
    }
  }, [location.search, refresh]);

  const handlePurchase = async (pack: { title: string; price: string; credits: number }) => {
    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) return alert("Please login first.");

      const amount = parsePeso(pack.price);
      const json = await paymentService.createInvoice({
        userId: user.id,
        amount,
        credits: pack.credits,
        packTitle: pack.title,
      });

      if (json?.invoice_url) {
        window.location.href = json.invoice_url;
      } else {
        console.error(json);
        alert("Failed to create payment. Try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong while creating the payment.");
    }
  };

  return (
    <div className="p-5 max-w-8xl mx-auto space-y-10">
      {/* Header / Current Balance */}
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Credits</h2>
            <p className="text-muted-foreground">Purchase credits to unlock certification exams and showcase your skills</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{credits} Credits</p>
            <p className="text-sm text-muted-foreground">Each certification attempt requires credits</p>
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={() => refresh()}>
                Refresh Balance
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Credit Packs */}
      <div className="grid md:grid-cols-3 gap-6">
        {creditPacks.map((pack) => (
          <Card key={pack.title} className={`relative border ${pack.popular ? "border-blue-500" : ""}`}>
            {pack.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                Most Popular
              </Badge>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">{pack.title}</CardTitle>
                {pack.popular && <CheckCircle className="h-5 w-5 text-blue-500" />}
              </div>
              <p className="text-sm text-muted-foreground">{pack.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <span className="text-2xl font-bold text-foreground">{pack.price}</span>
                  <span className="text-sm ml-1">/one-time</span>
                </p>
                <div className="flex items-center gap-2">
                  <CardIcon className="h-4 w-4" />
                  <span className="font-medium">{pack.credits} Credits</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  ₱{(parsePeso(pack.price) / pack.credits).toFixed(1)} per credit
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Premium exam access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Performance analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Digital certificates</span>
                </div>
              </div>

              <Button
                className={`w-full ${pack.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                onClick={() => handlePurchase(pack)}
              >
                Purchase
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <feature.icon className="h-8 w-8 text-muted-foreground" />
              <h3 className="font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          Questions about credits? Contact our support team for assistance.
        </p>
        <Button variant="outline" size="sm">Contact Support</Button>
      </div>
    </div>
  );
}
