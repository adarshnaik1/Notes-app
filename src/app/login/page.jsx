"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  /*Remove in prod*/ 
console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log("supabase:", supabase);
console.log("Signup payload:", { email, password, username });

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    setError(null);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        alert("Signup successful! Please check your email to confirm your account.");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard"); // Redirect to dashboard on successful login
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-black">
      <div className={cn("flex flex-col gap-6")}>
        <Card className="bg-black text-gray-300 w-[50vh]">
          <CardHeader>
            <CardTitle className="text-2xl">{isSignUp ? "Sign Up" : "Login"}</CardTitle>
            <CardDescription>
              {isSignUp
                ? "Enter your details below to create an account"
                : "Enter your email below to login to your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white text-black"
                  />
                </div>
                {isSignUp && (
                  <div className="grid gap-2">
                    <Label htmlFor="username" className="text-white">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-white text-black"
                    />
                  </div>
                )}
                <Button type="submit" className="w-full bg-black text-white border-gray-600 border-2">
                  {isSignUp ? "Sign Up" : "Login"}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="mt-4 text-center text-sm text-white">
                  {isSignUp ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleSignUp}
                        className="underline underline-offset-4"
                      >
                        Login
                      </button>
                    </>
                  ) : (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleSignUp}
                        className="underline underline-offset-4"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}