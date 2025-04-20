"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Dock from "@/components/Dock";
import TodoCard from "@/components/TodoCard";

export default function DashboardPage() {
  const [userTodos, setUserTodos] = useState([]);
  const [orgTodos, setOrgTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to update status of a todo
  const handleStatusChange = async (todoId, newStatus) => {
    await supabase.from("todos").update({ status: newStatus }).eq("id", todoId);
    // Refresh todos after update
    setUserTodos((prev) => prev.map((t) => t.id === todoId ? { ...t, status: newStatus } : t));
    setOrgTodos((prev) => prev.map((t) => t.id === todoId ? { ...t, status: newStatus } : t));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      // Fetch user's organization
      const { data: userData } = await supabase
        .from("users")
        .select("organization")
        .eq("id", user.id)
        .single();

      // Fetch todos created by the user
      const { data: myTodos } = await supabase
        .from("todos")
        .select("*")
        .eq("created_by", user.id);

      // Fetch todos for the user's organization
      let orgTodosData = [];
      if (userData?.organization) {
        const { data: orgTodosRes } = await supabase
          .from("todos")
          .select("*")
          .eq("organization_id", userData.organization);
        orgTodosData = orgTodosRes || [];
      }

      setUserTodos(myTodos || []);
      setOrgTodos(orgTodosData);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-6 flex flex-col gap-12 h-screen">
        <section className="min-h-1/3">
          <h2 className="text-xl font-bold mb-4">Your Todos</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row flex-wrap gap-4">
              {userTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} onStatusChange={handleStatusChange} />
              ))}
              {userTodos.length === 0 && <p>No todos found.</p>}
            </div>
          )}
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">Organization Todos</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row flex-wrap gap-4">
              {orgTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} onStatusChange={handleStatusChange} />
              ))}
              {orgTodos.length === 0 && <p>No organization todos found.</p>}
            </div>
          )}
        </section>
      </div>
      <div className="sticky bottom-0 z-40">
        <Dock />
      </div>
    </div>
  );
}