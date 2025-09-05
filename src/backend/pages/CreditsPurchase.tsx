import React, { useState, useEffect, type JSX } from "react";
import { CreditCard, Zap, Star, Crown, Loader } from "lucide-react";

// Define TypeScript interfaces
interface Package {
  title: string;
  amount: number;
  credits: number;
}

interface Packages {
  [key: string]: Package;
}

interface CreditsPurchaseProps {
  userId: string;
}

const CreditsPurchase: React.FC<CreditsPurchaseProps> = ({ userId }) => {
  const [packages, setPackages] = useState<Packages>({});
  const [loading, setLoading] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const API_BASE_URL = (import.meta as any).env?.VITE_SERVER_URL || "http://localhost:4000";

  useEffect(() => {
    fetchPackages();
    fetchUserCredits();
  }, [userId]);

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/packages`);
      const data = await res.json();
      if (data.success) setPackages(data.packages as Packages);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const fetchUserCredits = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/credits/${userId}`);
      const data = await res.json();
      if (data.success) setUserCredits(data.credits);
    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  };

  const handlePurchase = async (packageId: string) => {
    setLoading(true);
    setSelectedPackage(packageId);
    
    try {
      const pack = packages[packageId];
      if (!pack) throw new Error("Package not found");

      const res = await fetch(`${API_BASE_URL}/api/create-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: pack.amount,
          credits: pack.credits,
          packTitle: pack.title
        }),
      });
      
      const data = await res.json();
      
      if (data.success && data.invoice_url) {
        // Redirect to Xendit payment page
        window.location.href = data.invoice_url;
      } else {
        throw new Error(data.error || "Payment failed");
      }
    } catch (err) {
      console.error("Purchase error:", err);
      alert("Failed to create payment. Please try again.");
    } finally {
      setLoading(false);
      setSelectedPackage(null);
    }
  };

  const icons: Record<string, JSX.Element> = {
    starter: <Zap className="w-10 h-10 text-cyan-400" />,
    popular: <Star className="w-10 h-10 text-purple-400" />,
    pro: <Crown className="w-10 h-10 text-yellow-400" />,
    default: <CreditCard className="w-10 h-10 text-gray-400" />,
  };

  const colors: Record<string, string> = {
    starter: "border-cyan-500 hover:bg-cyan-600",
    popular: "border-purple-500 hover:bg-purple-600",
    pro: "border-yellow-500 hover:bg-yellow-600",
    default: "border-gray-500 hover:bg-gray-600",
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">💎 Purchase Credits</h1>
        <p className="text-gray-300 mb-4">Boost your Coduxa experience with credits</p>
        <div className="inline-block bg-gray-800 border-2 border-cyan-400 rounded-lg px-6 py-3">
          <p className="text-cyan-400 font-bold text-xl">
            {userCredits.toLocaleString()} Credits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(packages).map(([id, pack]) => (
          <div
            key={id}
            className={`bg-gray-800 rounded-xl p-6 border-2 ${
              colors[id] || colors.default
            } hover:scale-105 transition-transform duration-200 shadow-lg`}
          >
            <div className="flex justify-center mb-4">
              {icons[id] || icons.default}
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{pack.title}</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-extrabold">₱{pack.amount}</div>
              <div className="text-gray-400">
                {pack.credits.toLocaleString()} credits
              </div>
            </div>
            <div className="text-center mb-6 text-gray-300 font-medium">
              ₱{(pack.amount / pack.credits).toFixed(2)} per credit
            </div>
            <button
              onClick={() => handlePurchase(id)}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-black font-bold py-3 rounded-lg flex justify-center items-center"
            >
              {loading && selectedPackage === id ? (
                <Loader className="animate-spin w-5 h-5 mr-2" />
              ) : null}
              {loading && selectedPackage === id ? "Processing..." : "Purchase"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditsPurchase;