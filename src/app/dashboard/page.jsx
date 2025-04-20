"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FloatingDockDemo from "@/components/Dock";

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
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold mb-4">Your Todos</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {userTodos.map((todo) => (
                <li key={todo.id} className="mb-2 border-b border-gray-700 pb-2">
                  <div className="font-semibold">{todo.title}</div>
                  <div className="text-sm text-gray-400">{todo.description}</div>
                  <div className="text-xs text-gray-500">Status: {todo.status}</div>
                </li>
              ))}
              {userTodos.length === 0 && <li>No todos found.</li>}
            </ul>
          )}
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">Organization Todos</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {orgTodos.map((todo) => (
                <li key={todo.id} className="mb-2 border-b border-gray-700 pb-2">
                  <div className="font-semibold">{todo.title}</div>
                  <div className="text-sm text-gray-400">{todo.description}</div>
                  <div className="text-xs text-gray-500">Status: {todo.status}</div>
                </li>
              ))}
              {orgTodos.length === 0 && <li>No organization todos found.</li>}
            </ul>
          )}
        </section>
      </div>
      <Dock />
    </div>
  );
}