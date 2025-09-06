import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { UserPlus, Eye, EyeOff, Mail } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { supabase } from "../lib/supabaseClient";

// ✅ Fix: Added onSignUp to props
export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!termsAccepted) {
      setErrorMessage("You must accept the Terms and Privacy Policy.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { firstName, lastName } },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    try {
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Resend error:", err);
    }

    setIsRegistered(true);
    setIsLoading(false);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 mb-3 sm:mb-4">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <CardTitle className="text-lg sm:text-xl">Check your email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <p className="text-xs sm:text-sm text-muted-foreground">
              We've sent a confirmation link to{" "}
              <span className="font-medium">{email}</span>. Please confirm your email before logging in.
            </p>
            <Link to="/login" className="inline-block w-full">
              <Button className="w-full h-10 sm:h-11">Return to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 mb-3 sm:mb-4">
            <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <CardTitle className="text-lg sm:text-xl">Create an Account</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Fill in your details to get started
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* first + last name */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                  className="h-10 sm:h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                  className="h-10 sm:h-11"
                />
              </div>
            </div>

            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@example.com"
                required
                className="h-10 sm:h-11"
              />
            </div>

            {/* password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="pr-10 h-10 sm:h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(!!checked)}
              />
              <Label htmlFor="terms" className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {errorMessage && (
              <p className="text-xs sm:text-sm text-red-500">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full h-10 sm:h-11" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-xs sm:text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in instead
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
