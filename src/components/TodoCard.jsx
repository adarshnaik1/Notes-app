import { Badge } from "@/components/ui/badge";
import StatusButton from "@/components/StatusButton";
import { LucideTrash2 } from "lucide-react";
import { PencilIcon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // adjust path as needed
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function CheckStatus(status) {
  if (status == "pending")
    return (
      <Badge className="bg-red-400/60" variant="destructive">
        Pending
      </Badge>
    );
  if (status == "in_progress")
    return (
      <Badge className="bg-yellow-300/80" variant="secondary">
        In Progress
      </Badge>
    );
  if (status == "completed")
    return <Badge className="bg-green-400/30">Completed</Badge>;
}

export default function TodoCard({ todo, onStatusChange }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const router=useRouter();


  const handleEditSubmit = async () => {
    const { error } = await supabase
      .from("todos")
      .update({
        title: editedTitle,
        description: editedDescription,
      })
      .eq("id", todo.id);

    if (error) {
      console.error("Error updating todo:", error);
    } else {
      alert("Task updated successfully!");
      router.push('/dashboard')
       // Show browser alert

      setIsDialogOpen(false); // Automatically close the dialog
      if (onStatusChange) onStatusChange(); // Refresh list if needed
    }
  };

  const handleDelete = async () => {
    await supabase
      .from("todos")
      .delete()
      .eq("id", todo.id);
    if (onStatusChange) onStatusChange(); // refresh list if needed
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 min-w-[300px] max-w-xs flex flex-col gap-2 border border-gray-700">
      <div className="flex justify-between py-2">
        <StatusButton status={todo.status} todoId={todo.id} onStatusChange={onStatusChange} />
        <Dialog>
          <DialogTrigger asChild>
            <PencilIcon
              className="text-xl hover:text-green-300 cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            />
          </DialogTrigger>
          <DialogContent className="bg-black text-gray-300 border border-gray-700 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Task</DialogTitle>
              <DialogDescription className="text-gray-400">
                Modify the task details below and click submit to save changes.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="title" className="text-white mb-4">Title</Label>
                <Input
                  id="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="bg-gray-800 text-white border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <textarea
                  id="description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={4}
                  className="bg-gray-800 text-white border border-gray-600 rounded-md p-2 resize-none w-full mt-5"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEditSubmit} className="bg-green-500 text-white hover:bg-green-600">
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="font-semibold text-lg truncate">{todo.title}</div>
      <div className="text-sm text-gray-300 line-clamp-3">{todo.description}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-400">{CheckStatus(todo.status)}</div>
      </div>
      <div className="flex-row-reverse flex">
        <button onClick={handleDelete}>
          <LucideTrash2 className="text-xl hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}
