"use client";
import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";

export default function AddOrganizationForm() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch all organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, error } = await supabase.from("organizations").select("id, name");
      if (error) {
        setError(error.message);
      } else {
        setOrganizations(data);
      }
    };
    fetchOrganizations();
  }, []);

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError(userError?.message || "User not found");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ organization: selectedOrg })
      .eq("id", user.id);

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-black">
      <div className={cn("flex flex-col gap-6")}> 
        <Card className="bg-black text-gray-300 w-[50vh]">
          <CardHeader>
            <CardTitle className="text-2xl">Select Organization</CardTitle>
            <CardDescription>
              Choose an organization to associate with your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddOrganization}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="organization" className="text-white">
                    Organization
                  </Label>
                  <select
                    id="organization"
                    value={selectedOrg}
                    onChange={(e) => setSelectedOrg(e.target.value)}
                    required
                    className="bg-white text-black rounded-md p-2"
                  >
                    <option value="" disabled>
                      Select an organization
                    </option>
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full bg-black text-white border-gray-600 border-2" disabled={loading}>
                  {loading ? "Saving..." : "Save Organization"}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}