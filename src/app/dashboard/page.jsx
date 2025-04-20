"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Dock from "@/components/Dock";
import TodoCard from "@/components/TodoCard";

export default function DashboardPage() {
  const [userTodos, setUserTodos] = useState([]);
  const [orgTodos, setOrgTodos] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="p-8 flex flex-col gap-12">
        <section>
          <h2 className="text-xl font-bold mb-4">Your Todos</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row flex-wrap gap-4">
              {userTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
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
                <TodoCard key={todo.id} todo={todo} />
              ))}
              {orgTodos.length === 0 && <p>No organization todos found.</p>}
            </div>
          )}
        </section>
      </div>
      <Dock />
    </div>
  );
}