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

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch user and organization_id
  const getUserAndOrg = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return { error: userError || "User not found" };
    const { data, error: profileError } = await supabase
      .from("users")
      .select("organization")
      .eq("id", user.id)
      .single();
    if (profileError || !data) return { error: profileError || "Organization not found" };
    return { user, organization_id: data.organization };
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { user, organization_id, error: fetchError } = await getUserAndOrg();
    if (fetchError) {
      setError(fetchError.message || fetchError);
      setLoading(false);
      return;
    }
    const { error: insertError } = await supabase.from("todos").insert([
      {
        title,
        description,
        created_by: user.id,
        organization_id,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);
    setLoading(false);
    if (insertError) {
      setError(insertError.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-black">
      <div className={cn("flex flex-col gap-6")}> 
        <Card className="bg-black text-gray-300 w-[50vh]">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Task</CardTitle>
            <CardDescription>
              Enter the details below to create a new task
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTask}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-white">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-white text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={5}
                    className="bg-white text-black rounded-md p-2 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-black text-white border-gray-600 border-2" disabled={loading}>
                  {loading ? "Adding..." : "Add Task"}
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